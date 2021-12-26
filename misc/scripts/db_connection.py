from mongoengine import connect

try:
    connection = connect('parse', host='165.227.129.7', port=56728)
except Exception:
    print("Something went wrong while connecting to db")

if __name__ == "__main__":
    print("Connection script...")


