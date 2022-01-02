import json

from misc.models.Abi import Abi
from misc.models.Token import Token
from db_connection import connection

ABI_FOLDER_PATH = '/home/renato/Code/Moralis_Hackathon/Moralis_Avax_Hackathon/misc/files/abis'



def initialize_abis():
    tokens = Token.objects()
    for token in tokens:
        try:
            Abi.objects(tokenAddress=token.address).get()
            print("Abi for token {} already stored".format(token.address))
        except:
            try:
                path = '{}/{}.json'.format(ABI_FOLDER_PATH, token.address)
                with open(path) as f:
                    d = json.load(f)
                    print("Abi is: ")
                    print(d)
                # abi =
                    new_abi = Abi(tokenAddress=token["address"], abi=str(d))
                    new_abi.save()
                print("Abi for address {} successfully created".format(token["address"]))
            except Exception as e:
                print("Error creating abi {}. Error: {}".format(token["name"], e))

        print(token.name)

if __name__ == "__main__":
    print("Initializing abis...")
    try:
        initialize_abis()
        print("Initiaization completed!")
    except Exception as e:
        print("Some error occurred while initializing abis: {}".format(e))
