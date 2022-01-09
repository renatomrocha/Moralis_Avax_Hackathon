#!/home/ubuntu/backend/venv/bin/python
import sys, os
import pymongo
from datetime import datetime
from dotenv import load_dotenv
import pandas as pd
from itertools import product

load_dotenv()

db = pymongo.MongoClient(os.getenv("PROD_REMOTE_CONNECTION_STRING"))["parse"]

target_class = db["TokenPriceCorelation"]
source_class = db["Token1Day"]

target_class.delete_many({})

to_ts = datetime.now().timestamp()
from_ts = to_ts - 30 * 24 * 60 * 60

data = source_class.find(
    {"timeStamp": {"$lt": to_ts, "$gt": from_ts}},
    {"symbol", "timeStamp", "averagePrice"},
)

df = pd.DataFrame(data, columns=["symbol", "timeStamp", "averagePrice"])
tokens = pd.unique(df["symbol"])

df_T = df.pivot_table(index="timeStamp", columns="symbol", values="averagePrice")

for token0, token1 in product(tokens, repeat=2):
    obj = {
        "updatedAt": datetime.now(),
        "createdAt": datetime.now(),
        "symbol0": token0,
        "symbol1": token1,
        "correlation": df_T[token0].corr(df_T[token1]),
    }
    target_class.insert_one(obj)
