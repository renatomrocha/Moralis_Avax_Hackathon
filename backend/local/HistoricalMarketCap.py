import os, sys
import requests
from dotenv import load_dotenv
from datetime import datetime
import pymongo
import logging
import json
from web3 import Web3

from helper import ERC20TotalSupply, block_number_getter, TokenDetails

load_dotenv()

w3 = Web3(Web3.HTTPProvider(os.getenv('SPEEDY_NODE')))


_from = pymongo.MongoClient(os.getenv('KONS'))['parse']['Token15Min']


start_time = 1629417600
interval = 24 * 60 * 60
end_time = 1642178693

curr_time = start_time

while curr_time + interval < end_time:

    block = block_number_getter('avalanche', curr_time)

    for token in TokenDetails:

        objects = _from.find({'timeStamp': {'$gte': curr_time, '$lt': curr_time + interval}, 'symbol': token['symbol']})

        contract_function = w3.eth.contract(address=Web3.toChecksumAddress(token['address']), abi=ERC20TotalSupply)

        try:
            _total_supply = contract_function.functions.totalSupply().call(block_identifier=block)
        except:
            _total_supply = None

        for obj in objects:
            obj['totalSupply'] = _total_supply / 10 ** token['decimals']
            obj['marketCap'] = _total_supply * obj['price'] 
            _from.replace_one({'_id': obj['_id']}, obj)

    print('Updated timestamp {}'.format(curr_time))


    curr_time = curr_time + interval

# for obj in objects:

#     _decimal_class = pymongo.MongoClient(os.getenv('PROD'))['parse']['TokenDetails']
#     _decimal = _decimal_class.find_one({'address': obj['address']})['decimals']

#     block = block_number_getter('avalanche', obj['timeStamp'])

#     contract_function = w3.eth.contract(address=Web3.toChecksumAddress(obj['address']), abi=ERC20TotalSupply)

#     obj['totalSupply'] = contract_function.functions.totalSupply().call(block_identifier=block) / 

#     obj['marketCap'] = obj['averagePrice'] * obj['totalSupply']

#     _from.replace_one({'_id': obj['_id']}, obj)

