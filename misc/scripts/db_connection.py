from mongoengine import connect

try:
    connection = connect('parse', host='164.92.245.182', port=56728)
except Exception:
    print("Something went wrong while connecting to db")

if __name__ == "__main__":
    print("Connection script...")


