import os, sys
import requests
from dotenv import load_dotenv
from datetime import datetime
import pymongo
import logging

from helper import TokenDetails

load_dotenv()
logging.basicConfig(
    filename="logs/FetchTokenDataJob.log",
    level=logging.INFO,
    format="%(levelname)s:%(asctime)s:%(funcName)s:%(message)s",
)

# get the blocknumber given the timeStamp or date
def block_number_getter(chain, date_time):
    request_url = "https://deep-index.moralis.io/api/v2/dateToBlock"
    params = {"chain": chain, "date": date_time}
    headers = {"x-api-key": os.getenv("API_KEY")}

    parse_successful = False
    while not parse_successful:
        r = requests.get(request_url, params=params, headers=headers)
        try:
            result = r.json()["block"]
            parse_successful = True
        except:
            logging.warning(
                "False block response at timestamp {}. Trying again...".format(
                    date_time
                )
            )

    return result


# update price in the collection given a token and timestamp + blocknumber
def fetch_token_price(collection, symbol, address, chain, date_time, block_number):
    # block_number = block_number_getter(chain, date_time)

    request_url = "https://deep-index.moralis.io/api/v2/erc20/" + address + "/price"
    params = {"chain": chain, "to_block": block_number}
    headers = {"x-api-key": os.getenv("API_KEY")}

    parse_successful = False
    count = 0
    max_count = 5
    while (not parse_successful) and count < max_count:
        r = requests.get(request_url, params=params, headers=headers)
        count += 1
        try:
            result = r.json()["usdPrice"]
            parse_successful = True

            object = {
                "updatedAt": datetime.now(),
                "createdAt": datetime.now(),
                "symbol": symbol,
                "address": address,
                "timeStamp": date_time,
                "price": result,
            }
            collection.insert_one(object)
        except:
            if count == max_count:
                logging.warning(
                    "False price response for token {} at timestamp {}. Max attempts exceeded. Skipping...".format(
                        symbol, date_time
                    )
                )


if __name__ == "__main__":
    connection = pymongo.MongoClient(os.getenv("REMOTE_CONNECTION_STRING"))
    db = connection["parse"]
    collection = db["Token15Min"]

    if len(sys.argv) != 3:
        print("ERROR: Please specify the from, to timestamps")
        exit()
    else:
        _from_time = int(sys.argv[1])
        _to_time = int(sys.argv[2])
        print(_from_time+1)
        print(_to_time+1)

    # _from_time = 1640822400
    # _from_time = 1638864900
    # _to_time = 1641219300
    _interval = 15 * 60

    logging.info(
        "Starting to load data. From: {}. To: {}.".format(
            _from_time, _to_time
        )
    )
    curr_time = _from_time
    while curr_time <= _to_time:

        for _token in TokenDetails:
            _symbol = _token['symbol']
            _address = _token["address"]
            _chain = "avalanche"
            _bln = block_number_getter(_chain, curr_time)

            fetch_token_price(collection, _symbol, _address, _chain, curr_time, _bln)
        logging.info("Price Updated for timestamp {}".format(curr_time))
        curr_time += _interval
