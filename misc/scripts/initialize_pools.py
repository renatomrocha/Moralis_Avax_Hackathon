from misc.models.Pool import Pool
from misc.models.Token import Token
from db_connection import connection

pools = [{"name": "MIM-TIME", "token0": "0x130966628846bfd36ff31a822705796e8cb8c18d",
          "token1": "0xb54f16fb19478766a268f172c9480f8da1a7c9c3", "exchange": "TraderJoe"},
         {"name": "USDC.e-AVAX", "token0": "0xa7d7079b0fead91f3e65f86e8915cb59c1a4c664",
          "token1": "0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7", "exchange": "TraderJoe"},
         {"name": "MIM-AVAX", "token0": "0x130966628846bfd36ff31a822705796e8cb8c18d",
          "token1": "0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7", "exchange": "TraderJoe"},
         {"name": "WETH.e-AVAX", "token0": "0x49d5c2bdffac6ce2bfdb6640f4f80f226bc10bab",
          "token1": "0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7", "exchange": "TraderJoe"},
         {"name": "AVAX-USDT.e", "token0": "0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7",
          "token1": "0xc7198437980c041c805a1edcba50c1ce5db95118", "exchange": "TraderJoe"},
         {"name": "JOE-AVAX", "token0": "0x6e84a6216ea6dacc71ee8e6b0a5b7322eebc0fdd",
          "token1": "0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7", "exchange": "TraderJoe"},
         {"name": "WBTC.e-AVAX", "token0": "0x50b7545627a5162f82a992c33b87adc75187b218",
          "token1": "0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7", "exchange": "TraderJoe"},
         {"name": "LINK.e-AVAX", "token0": "0x5947bb275c521040051d82396192181b413227a3",
          "token1": "0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7", "exchange": "TraderJoe"},
         {"name": "AVAX-DAI.e", "token0": "0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7",
          "token1": "0xd586e7f844cea2f87f50152665bcbc2c279d8d70", "exchange": "TraderJoe"},
         ]


def initialize_pools():
    for pool in pools:
        try:
            Pool.objects(name=pool["name"]).get()
            print("Pool with name {} already stored in database".format(pool["name"]))
        except:
            try:
                new_pool = Pool(name=pool["name"], token0=pool["token0"], token1=pool["token1"], exchange=pool["exchange"])
                new_pool.save()
                print("Pool with name {} successfully created".format(pool["name"]))
            except Exception as e:
                print("Error creating pool {}. Error: {}".format(pool["name"], e))


if __name__ == "__main__":
    print("Initializing pools...")
    try:
        initialize_pools()
        print("Initiaization completed!")
    except Exception as e:
        print("Some error occurred while initializing pools: {}".format(e))
