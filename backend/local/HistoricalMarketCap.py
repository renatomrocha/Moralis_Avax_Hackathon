import os, sys
import requests
from dotenv import load_dotenv
from datetime import datetime
import pymongo
import logging

from helper import ERC20TotalSupply

load_dotenv()

import requests
import json

_from = pymongo.MongoClient(os.getenv('PROD'))['parse']['Token1Day']
objects = _from.find({})

for obj in objects:

    _decimal_class = pymongo.MongoClient(os.getenv('PROD'))['parse']['TokenDetails']
    _decimal = _decimal_class.find_one({'address': obj['address']})['decimals']

    url = "https://deep-index.moralis.io/api/v2/" + obj['address'] + "/function"

    params = {
        'chain': 'avalanche',
        'function_name': 'totalSupply',
        'to_date': obj['timeStamp'],
    }


    headers = {
    'accept': 'application/json',
    "x-api-key": os.getenv("API_KEY"),
    'Content-Type': 'application/json'
    }

    
    parse_successful = False
    count = 0
    max_count = 5
    while (not parse_successful) and count < max_count:
        count += 1
        try:
            response = requests.request("POST", url, headers=headers, params=params, data=ERC20TotalSupply)
            obj['totalSupply'] = int(response.json()) / (10 ** _decimal)
            parse_successful = True
        except:
            obj['totalSupply'] = 0
            if count == 5:
                print("Max tries exceeded for {} at timestamp {}".format(obj['symbol'],obj['timestamp']))

    obj['marketCap'] = obj['totalSupply'] * obj['averagePrice']

    # _from.replace_one({'_id': obj['_id']}, obj)

    print(obj['symbol'], obj['timeStamp'], obj['totalSupply'], obj['marketCap'])

