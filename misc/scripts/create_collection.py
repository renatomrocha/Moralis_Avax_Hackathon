from db_connection_test import moralis_db_client, main_db


def check_existence_collection(collection_name):
    """It verifies the existence of collection name in a database"""
    collection_list = main_db.list_collection_names()
    if collection_name in collection_list:
        return True
        print(f"Collection: '{collection_name}' in Database: '{main_db}' exists")
    print(f"Collection: '{collection_name}' in Database: '{main_db}' does not exists")


if __name__ == '__main__':
    collection_name = 'Token'
    new_document = {'name': 'JOE', 'address': '0x6e84a6216ea6dacc71ee8e6b0a5b7322eebc0fdd', 'priceHistory': []}
    # new_document = {'name': 'Uniswap', 'address': ''}

    if check_existence_collection('Token'):
        try:
            print('Collection exists... will insert new document')
            main_db[collection_name].insert_one(new_document)
        except Exception:
            print('Something went wrong')
    else:
        print('Will create new collection')
        try:
            main_db[collection_name].insert_one(new_document)
            print('New item inserted in new collection')
        except Exception:
            print('Something went wrong while creating new colletcion')
