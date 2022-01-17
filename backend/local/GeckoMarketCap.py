import os
import sys
import requests
from dotenv import load_dotenv
from datetime import datetime
import time
import pymongo
import logging
import json
from web3 import Web3

from helper import ERC20TotalSupply, block_number_getter, TokenDetails

logging.basicConfig(filename="logs/GeckoMarketCap.log", level=logging.INFO,
                    format="%(levelname)s:%(asctime)s:%(funcName)s:%(message)s",)

load_dotenv()

_from = pymongo.MongoClient(os.getenv('PROD'))['parse']['Token15Min']

_control = pymongo.MongoClient(os.getenv('PROD'))['parse']['SummaryControl']


def get_gecko_market_cap(gecko_id, time_stamp):

    date_string = datetime.utcfromtimestamp(time_stamp).strftime("%d-%m-%Y")

    url = "https://api.coingecko.com/api/v3/coins/" + \
        gecko_id + "/history?date=" + date_string

    headers = {
        'accept': 'application/json'
    }

    response = requests.request("GET", url, headers=headers, )

    parse_successful = False
    count = 0
    max_count = 5
    while (not parse_successful) and count < max_count:
        count += 1
        try:
            _usd_market_cap = response.json(
            )['market_data']['market_cap']['usd']
            parse_successful = True
        except:
            _usd_market_cap = -999

    return _usd_market_cap


# start_time = 1629417600
control_entry = _control.find_one({'summaryType': 'GeckoMarketCap'})
last_update = control_entry['lastUpdateTimeStamp']
interval = 24 * 60 * 60
end_time = datetime.now().timestamp()
start_time = max(last_update - 2 * interval, 1629417600)

curr_time = start_time

while curr_time + interval < end_time:

    # block = block_number_getter('avalanche', curr_time)

    for token in TokenDetails:

        if token['gecko_id'] != '':

            objects = _from.find({'timeStamp': {
                                 '$gte': curr_time, '$lt': curr_time + interval}, 'symbol': token['symbol']})

            # contract_function = w3.eth.contract(address=Web3.toChecksumAddress(token['address']), abi=ERC20TotalSupply)

            gecko_market_cap = get_gecko_market_cap(
                token['gecko_id'], curr_time)
            time.sleep(1)

            for obj in objects:
                obj['geckoMarketCap'] = gecko_market_cap

                _from.replace_one({'_id': obj['_id']}, obj)

    control_entry['lastUpdateTimeStamp'] = curr_time
    _control.replace_one({'summaryType': 'GeckoMarketCap'}, control_entry)
    logging.info('Updated timestamp {}'.format(curr_time))

    curr_time = curr_time + interval
