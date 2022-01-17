import os
import sys
import requests
from dotenv import load_dotenv
from datetime import datetime
import pymongo
import logging
import json
from web3 import Web3

from helper import ERC20TotalSupply, block_number_getter, TokenDetails

logging.basicConfig(filename="MarketCap.log", level=logging.INFO,
                    format="%(levelname)s:%(asctime)s:%(funcName)s:%(message)s",)

load_dotenv()

w3 = Web3(Web3.HTTPProvider(os.getenv('SPEEDY_NODE')))


_from = pymongo.MongoClient(os.getenv('PROD'))['parse']['Token15Min']


start_time = 1629417600
interval = 24 * 60 * 60
end_time = 1642178693

curr_time = start_time

while curr_time < end_time:

    block = block_number_getter('avalanche', curr_time)

    for token in TokenDetails:

        objects = _from.find({'timeStamp': {
                             '$gte': curr_time, '$lt': curr_time + interval}, 'symbol': token['symbol']})

        contract_function = w3.eth.contract(
            address=Web3.toChecksumAddress(token['address']), abi=ERC20TotalSupply)

        parse_successful = False
        count = 0
        max_count = 5
        while (not parse_successful) and count < max_count:
            count += 1
            try:
                _total_supply = contract_function.functions.totalSupply().call(block_identifier=block)
                parse_successful = True
            except:
                _total_supply = -999

        for obj in objects:
            if _total_supply != -999:
                obj['totalSupply'] = _total_supply / 10 ** token['decimals']
                obj['marketCap'] = obj['totalSupply'] * obj['price']
            else:
                obj['totalSupply'] = -999
                obj['marketCap'] = -999

            _from.replace_one({'_id': obj['_id']}, obj)
            # print(obj['symbol'],obj['timeStamp'],obj['totalSupply'],obj['price'], obj['marketCap'])

    logging.info('Updated timestamp {}'.format(curr_time))

    curr_time = curr_time + interval

# for obj in objects:

#     _decimal_class = pymongo.MongoClient(os.getenv('PROD'))['parse']['TokenDetails']
#     _decimal = _decimal_class.find_one({'address': obj['address']})['decimals']

#     block = block_number_getter('avalanche', obj['timeStamp'])

#     contract_function = w3.eth.contract(address=Web3.toChecksumAddress(obj['address']), abi=ERC20TotalSupply)

#     obj['totalSupply'] = contract_function.functions.totalSupply().call(block_identifier=block) /

#     obj['marketCap'] = obj['averagePrice'] * obj['totalSupply']

#     _from.replace_one({'_id': obj['_id']}, obj)
