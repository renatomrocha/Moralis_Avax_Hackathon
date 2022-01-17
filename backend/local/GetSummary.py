#!/home/ubuntu/backend/venv/bin/python
import sys
import os
import pymongo
from datetime import datetime
from helper import TokenDetails, get_next_timestamp, adjust_timestamp
import logging
from dotenv import load_dotenv

load_dotenv()

db = pymongo.MongoClient(os.getenv("PROD_REMOTE_CONNECTION_STRING"))["parse"]


def update_control_class(symmary_type, symbol, timestamp):
    _collection = db["SummaryControl"]
    _obj = {
        "updatedAt": datetime.now(),
        "createdAt": datetime.now(),
        "summaryType": symmary_type,
        "symbol": symbol,
        "lastUpdateTimeStamp": timestamp,
    }
    _collection.replace_one(
        {"summaryType": symmary_type, "symbol": symbol}, _obj, upsert=True
    )


def get_timestamps(summary_type, symbol):

    _collection1 = db["SummaryControl"]
    _object1 = _collection1.find_one(
        {"summaryType": summary_type, "symbol": symbol})

    _collection2 = db["Token15Min"]
    _pipeline = [
        {"$match": {"symbol": symbol}},
        {
            "$group": {
                "_id": {},
                "minTS": {"$min": "$timeStamp"},
                "maxTS": {"$max": "$timeStamp"},
            }
        },
    ]
    _object2 = list(_collection2.aggregate(_pipeline))

    if _object1 is not None:
        _ts = get_next_timestamp(summary_type, _object1["lastUpdateTimeStamp"])
    elif len(_object2) != 0:
        _ts_min = _object2[0]["minTS"]
        _ts = adjust_timestamp(_ts_min, summary_type)
    else:
        _ts = 0

    if len(_object2) != 0:
        _ts_max = _object2[0]["maxTS"]
    else:
        _ts_max = 0
        logging.warning(
            "Token {} skipped because there is no data".format(symbol))

    return _ts, _ts_max


if __name__ == "__main__":
    allowed_sum_types = ["Token1Hour", "Token4Hour", "Token1Day"]
    if len(sys.argv) != 2:
        print("ERROR: Please specify the type of summary")
        exit()
    elif sys.argv[1] not in allowed_sum_types:
        print("ERROR: Please provide a valid summary type")
        exit()
    else:
        _summary_type = sys.argv[1]
        logging.basicConfig(
            filename="logs/Summary_Job_Log_{}.log".format(_summary_type),
            level=logging.INFO,
            format="%(levelname)s:%(asctime)s:%(funcName)s:%(message)s",
        )
    logging.info("Starting new load...")
    source_collection = db["Token15Min"]
    target_collection = db[_summary_type]
    detail_collection = db["TokenDetails"]

    for _token in TokenDetails:
        _symbol = _token["symbol"]
        _address = _token["address"]

        first_update_timestamp, max_available_timestamp = get_timestamps(
            _summary_type, _symbol
        )

        curr_time = first_update_timestamp
        next_time = get_next_timestamp(_summary_type, curr_time)

        while next_time < max_available_timestamp:
            pipeline = [
                {
                    "$match": {
                        "$and": [
                            {"symbol": _symbol},
                            {"timeStamp": {"$gte": curr_time}},
                            {"timeStamp": {"$lt": next_time}},
                        ]
                    }
                },
                {"$sort": {"timeStamp": 1}},
                {
                    "$group": {
                        "_id": {},
                        "countRecords": {"$sum": 1},
                        "averagePrice": {"$avg": "$price"},
                        "minimumPrice": {"$min": "$price"},
                        "maximumPrice": {"$max": "$price"},
                        "openPrice": {"$first": "$price"},
                        "closePrice": {"$last": "$price"},
                        "totalSupply": {"$avg": "$totalSupply"},
                        "marketCap": {"$avg": "$marketCap"},
                        "geckoMarketCap": {"$avg": "$geckoMarketCap"},
                    }
                },
            ]

            _list = list(source_collection.aggregate(pipeline))
            if len(_list) > 0:
                _obj = _list[0]
                cnt = _obj["countRecords"]
            else:
                cnt = 0

            if cnt > 0:

                _obj.pop("_id")
                _obj.pop("countRecords")
                _obj["updatedAt"] = (datetime.now(),)
                _obj["createdAt"] = (datetime.now(),)
                _obj["symbol"] = _symbol
                _obj["address"] = _address
                _obj["timeStamp"] = curr_time
                _obj["priceRange"] = _obj["maximumPrice"] - \
                    _obj["minimumPrice"]
                if _obj["openPrice"] != 0:
                    _obj["pctChange"] = (_obj["closePrice"] - _obj["openPrice"]) / _obj[
                        "openPrice"
                    ]

                target_collection.insert_one(_obj)
                update_control_class(_summary_type, _symbol, curr_time)

            else:
                logging.warning(
                    "Skipped token {} for time {}".format(
                        _symbol, datetime.utcfromtimestamp(curr_time)
                    )
                )

            curr_time = next_time
            next_time = get_next_timestamp(_summary_type, curr_time)
