from mongoengine import connect

production_server_host ='165.227.129.7'
test_server_host = '164.92.245.182'

try:
    connection = connect('parse', host=production_server_host, port=56728)
    print("Connected")
except Exception:
    print("Something went wrong while connecting to db")

if __name__ == "__main__":
    print("Connection script...")


