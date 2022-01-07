import os
import requests
import json
import pymongo
from datetime import datetime
from helper import TraderJoePairCreatedEventABI, make_dictionary

from dotenv import load_dotenv
load_dotenv()

url = "https://deep-index.moralis.io/api/v2/0x9Ad6C38BE94206cA50bb0d90783181662f0Cfa10/events"


headers = {
  'accept': 'application/json',
  'x-api-key': os.getenv("API_KEY"),
  'Content-Type': 'application/json'
}

start_block = 8013468
stop_block = 9253023
interval = 50000

while start_block + interval < stop_block:

    params = {
    'chain': 'avalanche',
    'topic': 'PairCreated(address,address,address,uint256)',
    'from_block': start_block,
    'to_block': start_block + interval,
}
    response = requests.request("POST", url, headers=headers, params=params, data=TraderJoePairCreatedEventABI)

    # print(json.loads(response.text)['result'][0])
    # Create an object from response
    results = json.loads(response.text)['result']

    connection = pymongo.MongoClient(os.getenv("PROD_REMOTE_CONNECTION_STRING"))
    token_details = connection['parse']['TokenDetails']
    collection = connection['parse']['DexTokenPairDetails']

    address_dictionary = make_dictionary(token_details, 'address', ['name', 'symbol'])

    # print(address_dictionary['0x37b608519f91f702eeb0e5ed9af4061722e4f76'])

    count_total = 0
    count_modified = 0
    count_inserted = 0
    count_failed = 0
    for pair in results:
        token0_address = pair['data']['token0']
        token1_address = pair['data']['token1']
        _object = {
            'createdAt': datetime.now(),
            'updatedAt': datetime.now(),
            'dex_name': 'Trader Joe',
            'factory_address': pair['address'],
            'pair_creation_block': int(pair['block_number']),
            'pair_address': pair['data']['pair'],
            'token0_address': token0_address,
            'token0_name': '',
            'token0_symbol': '',
            'token1_address': token1_address,
            'token1_name': '',
            'token1_symbol': '',
            'in_database': 0,
        }

        if token0_address in address_dictionary:
            _object['token0_name'] = address_dictionary[token0_address]['name']
            _object['token0_symbol'] = address_dictionary[token0_address]['symbol']

        if token1_address in address_dictionary:
            _object['token1_name'] = address_dictionary[token1_address]['name']
            _object['token1_symbol'] = address_dictionary[token1_address]['symbol']

        if _object['token0_symbol'] != '' and _object['token1_symbol'] != '':
            _object['in_database'] = 1

        result = collection.replace_one({"dex_name": _object["dex_name"], 'pair_address': _object['pair_address']}, _object, upsert=True)

        count_total += 1
        if result.raw_result["updatedExisting"]:
            count_modified += 1
        else:
            count_inserted += 1

    print(
    "{} documents fetched from blocks {} to {}. {} documents inserted. {} updated.".format(
        count_total, start_block, start_block + interval, count_inserted, count_modified
    )
    )

    start_block = start_block + interval





