from misc.models.Token import Token


tokens = [{"name": "Tether", "symbol": "USDT.e", "address": "0xc7198437980c041c805a1edcba50c1ce5db95118"},
          {"name": "USD Coin", "symbol": "USDC.e", "address": "0xa7d7079b0fead91f3e65f86e8915cb59c1a4c664"},
          {"name": "Wrapped AVAX", "symbol": "WAVAX.e", "address": "0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7"},
          {"name": "SHIBA INU", "symbol": "SHIB.e", "address": "0x02d980a0d7af3fb7cf7df8cb35d9edbcf355f665"},
          {"name": "Wrapped BTC", "symbol": "WBTC.e", "address": "0x50b7545627a5162f82a992c33b87adc75187b218"},
          {"name": "DAI Stablecoin", "symbol": "DAI.e", "address": "0xd586e7f844cea2f87f50152665bcbc2c279d8d70"},
          {"name": "Uniswap", "symbol": "UNI.e", "address": "0x8ebaf22b6f053dffeaf46f4dd9efa95d89ba8580"},
          {"name": "Chainlink Token", "symbol": "LINK.e", "address": "0x5947bb275c521040051d82396192181b413227a3"},
          {"name": "Graph Token", "symbol": "GRT.e", "address": "0xd586e7f844cea2f87f50152665bcbc2c279d8d70"},
          {"name": "Aave Token", "symbol": "AAVE.e", "address": "0x63a72806098bd3d9520cc43356dd78afe5d386d9"},
          {"name": "Maker", "symbol": "MKR.e", "address": "0x88128fd4b259552a9a1d457f435a6527aab72d42"},
          {"name": "Basic Attention Token", "symbol": "BAT.e", "address": "0x98443b96ea4b0858fdf3219cd13e98c7a4690588"},
          {"name": "Curve DAO Token", "symbol": "CRV.e", "address": "0x249848beca43ac405b8102ec90dd5f22ca513c06"},
          {"name": "Compound", "symbol": "COMP.e", "address": "0xc3048e19e76cb9a3aa9d77d8c03c29fc906e2437"},
          {"name": "1INCH Token", "symbol": "1INCH.e", "address": "0xd501281565bf7789224523144fe5d98e8b28f267"},
          {"name": "Spell Token", "symbol": "SPELL", "address": "0xce1bffbd5374dac86a2893119683f4911a2f7814"},
          {"name": "JoeToken", "symbol": "JOE", "address": "0x6e84a6216ea6dacc71ee8e6b0a5b7322eebc0fdd"}]


def initialize_tokens():
    for token in tokens:
        try:
            Token.objects(name=token["name"]).get()
            print("Token with name {} already stored in database".format(token["name"]))
        except:
            try:
                new_token = Token(name=token["name"], symbol=token["symbol"], address=token["address"])
                new_token.save()
                print("Token with name {} successfully created".format(token["name"]))
            except Exception as e:
                print("Error creating token {}. Error: {}".format(token["name"], e))


if __name__ == "__main__":
    print("Initializing tokens...")
    try:
        initialize_tokens()
        print("Initiaization completed!")
    except Exception as e:
        print("Some error occurred while initializing tokens: {}".format(e))
