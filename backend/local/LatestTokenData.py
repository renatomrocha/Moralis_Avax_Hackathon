import sys
import os
import pymongo
from datetime import datetime
from helper import TokenDetails, get_next_timestamp, adjust_timestamp
import logging
from dotenv import load_dotenv

load_dotenv()

db = pymongo.MongoClient(os.getenv("PROD_REMOTE_CONNECTION_STRING"))["parse"]

logging.basicConfig(
    filename="logs/Latest_Summary.log",
    level=logging.INFO,
    format="%(levelname)s:%(asctime)s:%(funcName)s:%(message)s",
)

if __name__ == "__main__":
    data_collection = db["Token15Min"]
    target_collection = db["TokenDetails"]

    records = target_collection.find({})
    end = int(datetime.now().timestamp())
    start = end - (24 * 60 * 60)

    for record in records:

        _symbol = record['symbol']

        pipeline = [
            {
                "$match": {
                    "$and": [
                        {"symbol": _symbol},
                        {"timeStamp": {"$gte": start}},
                        {"timeStamp": {"$lt": end}},
                    ]
                }
            },
            {"$sort": {"timeStamp": 1}},
            {
                "$group": {
                    "_id": {},
                    "openPrice": {"$first": "$price"},
                    "closePrice": {"$last": "$price"},
                    "currentMarketCap": {"$last": "$marketCap"},
                }
            },
        ]
        _list = list(data_collection.aggregate(pipeline))
        if len(_list) > 0:
            record['currentPrice'] = _list[0]['closePrice']
            record['currentMarketCap'] = _list[0]['currentMarketCap']
            if _list[0]['openPrice'] != 0:
                record['pctPriceChange24Hr'] = (
                    _list[0]['closePrice'] - _list[0]['openPrice'])/_list[0]['openPrice']
            else:
                record['pctPriceChange24Hr'] = None
                logging.warning(f'Token {_symbol} has open price zero')
        else:
            record['currentPrice'] = None
            record['pctPriceChange24Hr'] = None
            record['currentMarketCap'] = None
            logging.warning(f'No records found for token {_symbol}')

        target_collection.replace_one(
            {"_id": record['_id']}, record, upsert=True
        )
