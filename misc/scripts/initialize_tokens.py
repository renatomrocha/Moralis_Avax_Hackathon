from misc.models.Token import Token
from db_connection import connection

tokens = [{"name": "Ethereum", "symbol": "WETH.e", "address": "0x49d5c2bdffac6ce2bfdb6640f4f80f226bc10bab"},
            {"name": "Tether", "symbol": "USDT.e", "address": "0xc7198437980c041c805a1edcba50c1ce5db95118"},
            {"name": "Avalanche", "symbol": "WAVAX.e", "address": "0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7"},
            {"name": "Uniswap", "symbol": "UNI.e", "address": "0x8ebaf22b6f053dffeaf46f4dd9efa95d89ba8580"},
            {"name": "Chainlink", "symbol": "LINK.e", "address": "0x5947bb275c521040051d82396192181b413227a3"},
            {"name": "Aave", "symbol": "AAVE.e", "address": "0x63a72806098bd3d9520cc43356dd78afe5d386d9"},
            {"name": "1INCH Token", "symbol": "1INCH.e", "address": "0xd501281565bf7789224523144fe5d98e8b28f267"},
            {"name": "SushiSwap", "symbol": "SUSHI.e", "address": "0x37b608519f91f70f2eeb0e5ed9af4061722e4f76"},
            {"name": "Frax", "symbol": "FRAX", "address": "0xd24c2ad096400b6fbcd2ad8b24e7acbc21a1da64"},
            {"name": "AnySwap", "symbol": "ANY", "address": "0xb44a9b6905af7c801311e8f4e76932ee959c663c"},
            {"name": "Frax Share", "symbol": "FXS", "address": "0x214db107654ff987ad859f34125307783fc8e387"},
            {"name": "JOE", "symbol": "JOE", "address": "0x6e84a6216ea6dacc71ee8e6b0a5b7322eebc0fdd"},
          {"name": "AllianceBlock", "symbol": "WALBT", "address": "0x9e037de681cafa6e661e6108ed9c2bd1aa567ecd"},
          {"name": "TrustSwap", "symbol": "SWAP.e", "address": "0xc7b5d72c836e718cda8888eaf03707faef675079"},
          {"name": "Beefy Finance", "symbol": "BIFI", "address": "0xd6070ae98b8069de6b494332d1a1a81b6179d960"},
          {"name": "Pangolin", "symbol": "PNG", "address": "0x60781c2586d68229fde47564546784ab3faca982"},
          {"name": "BENQI", "symbol": "QI", "address": "0x8729438eb15e2c8b576fcc6aecda6a148776c0f5"},
          {"name": "DeFi Yield Protocol", "symbol": "DYP", "address": "0x961c8c0b1aad0c0b10a51fef6a867e3091bcef17"},
          {"name": "Snowball", "symbol": "SNOB", "address": "0xc38f41a296a4493ff429f1238e030924a1542e50"},
          {"name": "Avalaunch", "symbol": "XAVA", "address": "0xd1c3f94de7e5b45fa4edbba472491a9f4b166fc4"},
          {"name": "Yield Yak", "symbol": "YAK", "address": "0x59414b3089ce2af0010e7523dea7e2b35d776ec7"},
          {"name": "USD Coin", "symbol": "USDC.e", "address": "0xa7d7079b0fead91f3e65f86e8915cb59c1a4c664"},
          {"name": "DAI", "symbol": "DAI.e", "address": "0xd586e7f844cea2f87f50152665bcbc2c279d8d70"},
          {"name": "Crabada", "symbol": "CRA", "address": "0xa32608e873f9ddef944b24798db69d80bbb4d1ed"},
          {"name": "OpenOcean", "symbol": "OOE", "address": "0x0ebd9537a25f56713e34c45b38f421a1e7191469"},
          {"name": "Magic Internet Money", "symbol": "MIM", "address": "0x130966628846bfd36ff31a822705796e8cb8c18d"},
          {"name": "HurricaneSwap Token", "symbol": "HCT", "address": "0x45c13620b55c35a5f539d26e88247011eb10fdbd"},
          {"name": "Colony", "symbol": "CLY", "address": "0xec3492a2508ddf4fdc0cd76f31f340b30d1793e6"},
          {"name": "SmarterCoin", "symbol": "SMRTr", "address": "0x6d923f688c7ff287dc3a5943caeefc994f97b290"},
          {"name": "Time", "symbol": "TIME", "address": "0xb54f16fb19478766a268f172c9480f8da1a7c9c3"},
          {"name": "JoeBar", "symbol": "xJOE", "address": "0x57319d41f71e81f3c65f2a47ca4e001ebafd4f33"},
          {"name": "Wrapped BTC", "symbol": "WBTC.e", "address": "0x50b7545627a5162f82a992c33b87adc75187b218"},
]

# {"name": "Graph Token", "symbol": "GRT.e", "address": "0xd586e7f844cea2f87f50152665bcbc2c279d8d70"},
#
# {"name": "Maker", "symbol": "MKR.e", "address": "0x88128fd4b259552a9a1d457f435a6527aab72d42"},
# {"name": "Basic Attention Token", "symbol": "BAT.e", "address": "0x98443b96ea4b0858fdf3219cd13e98c7a4690588"},
# {"name": "Curve DAO Token", "symbol": "CRV.e", "address": "0x249848beca43ac405b8102ec90dd5f22ca513c06"},
# {"name": "Compound", "symbol": "COMP.e", "address": "0xc3048e19e76cb9a3aa9d77d8c03c29fc906e2437"},
#
# {"name": "Spell Token", "symbol": "SPELL", "address": "0xce1bffbd5374dac86a2893119683f4911a2f7814"},
# {"name": "SHIBA INU", "symbol": "SHIB.e", "address": "0x02d980a0d7af3fb7cf7df8cb35d9edbcf355f665"},


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
