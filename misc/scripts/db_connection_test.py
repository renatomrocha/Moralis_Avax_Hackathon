import pymongo

# Connect to Moralis database
moralis_db_client = pymongo.MongoClient("mongodb://164.92.245.182:56728/")
# Select required database
main_db = moralis_db_client.parse


if __name__ == "__main__":
    #List collections
    collections = main_db.list_collection_names()

    print(collections)

    dex_collection = main_db['Token']

    dexes = dex_collection.find()

    for dex in dexes:
        print(dex["name"])

    # print()



# print(myclient.list_database_names())
