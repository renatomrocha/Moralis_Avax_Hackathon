from misc.models.Token import Token
from misc.models.TokenPrice import TokenPrice
from db_connection import connection


def delete_tokens_by_address(addr):
    TokenPrice.objects(address=addr).delete()


if __name__ == "__main__":
    try:
        address = "0x130966628846bfd36ff31a822705796e8cb8c18d"
        delete_tokens_by_address(address)
        print("Successfully removed tokens with address {}".format(address))
    except Exception as e:
        print("Something went wrong")
        print(e)