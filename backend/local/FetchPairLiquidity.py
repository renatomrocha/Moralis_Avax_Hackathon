#!/home/ubuntu/backend/venv/bin/python
import sys, os
import requests
import json
import pymongo
from datetime import datetime
from helper import TraderJoeSyncEventABI
import logging
from dotenv import load_dotenv

load_dotenv()

db = pymongo.MongoClient(os.getenv("PROD_REMOTE_CONNECTION_STRING"))["parse"]


def get_pair_liquidity(address, from_time, to_time):

    url = "https://deep-index.moralis.io/api/v2/" + address + "/events"

    params = {
        "chain": "avalanche",
        "from_date": from_time,
        "to_date": to_time,
        "topic": "Sync(uint112,uint112)",
        "limit": 1,
    }

    headers = {
        "accept": "application/json",
        "x-api-key": os.getenv("API_KEY"),
        "Content-Type": "application/json",
    }

    response = requests.request(
        "POST", url, headers=headers, params=params, data=TraderJoeSyncEventABI
    )

    result = response.json()["result"]
    if len(result) == 1:
        reserve0 = int(result[0]["data"]["reserve0"])
        reserve1 = int(result[0]["data"]["reserve1"])
    else:
        reserve0 = -999
        reserve1 = -999

    return reserve0, reserve1


if __name__ == "__main__":

    control_class = pymongo.MongoClient(os.getenv("PROD_REMOTE_CONNECTION_STRING"))[
        "parse"
    ]["DexTokenPairControl"]
    price_class = pymongo.MongoClient(os.getenv("PROD_REMOTE_CONNECTION_STRING"))[
        "parse"
    ]["Token1Day"]
    target_class = pymongo.MongoClient(os.getenv("PROD_REMOTE_CONNECTION_STRING"))[
        "parse"
    ]["DexTokenPairLiquidity"]
    pairs = control_class.find()

    _interval = 24 * 60 * 60

    for pair in pairs:

        curr_time = pair["timeStamp"] + _interval
        max_time = int(datetime.now().timestamp())

        while curr_time + _interval < max_time:
            pair.pop("_id")

            reserve0, reserve1 = get_pair_liquidity(
                pair["pairAddress"], curr_time, curr_time + _interval
            )

            if reserve0 != -999:
                pair["reserve0"] = reserve0 / (10 ** pair["decimal0"])
                pair["reserve1"] = reserve1 / (10 ** pair["decimal1"])

            try:
                pair["price0"] = price_class.find_one(
                    {"symbol": pair["symbol0"], "timeStamp": curr_time}
                )["averagePrice"]
                pair["price1"] = price_class.find_one(
                    {"symbol": pair["symbol1"], "timeStamp": curr_time}
                )["averagePrice"]

                pair["tvl0"] = pair["reserve0"] * pair["price0"]
                pair["tvl1"] = pair["reserve1"] * pair["price1"]
            except:
                print(
                    "No price found for {} or {} for timestamp {}".format(
                        pair["symbol0"], pair["symbol1"], curr_time
                    )
                )

            pair["timeStamp"] = curr_time

            control_class.replace_one(
                {"pairAddress": pair["pairAddress"]}, pair, upsert=True
            )

            pair["createdAt"] = datetime.now()
            pair["updatedAt"] = datetime.now()

            target_class.insert_one(pair)

            curr_time += _interval
