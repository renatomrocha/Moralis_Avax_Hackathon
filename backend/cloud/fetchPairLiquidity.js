Moralis.Cloud.job("FetchPairLiquidity", async (request) => {

  Moralis.settings.setAPIRateLimit({
  anonymous:100, authenticated:100, windowMs:60000
})

// Get Liquidity
// const logger = Moralis.Cloud.getLogger();

const abi = Moralis.Object.extend("ABIs");
const query1 = new Moralis.Query(abi);
query1.equalTo('name', 'TraderJoePairGetReservesFunction');
const result1 = (await query1.find())[0];
const functionABI = JSON.parse(result1.get('abi'));

const pairClass = Moralis.Object.extend("DexTokenPairDetails");
const query2 = new Moralis.Query(pairClass);
query2.equalTo('in_database', 1);
const pairs = await query2.find();


for (i=0; i<pairs.length; i++){
    const pair = pairs[i];
    // logger.info(pair.get("pair_address"))
    const _address = pair.get("pair_address");
    const _reserves = await Moralis.Web3API.native.runContractFunction({
            chain: "avalanche",
            address: _address,
            function_name: "getReserves",
            abi: functionABI,
    })

    const liquidityClass = Moralis.Object.extend("DexTokenPairLiquidity");
    const liquidity = new liquidityClass();

    liquidity.set('dexName', pair.get("dex_name"));
    liquidity.set('pairAddress', pair.get("pair_address"));
    liquidity.set('timeStamp', parseInt(new Date().getTime()/1000))
    liquidity.set('tokenName0', pair.get("token0_name"));
    liquidity.set('tokenName1', pair.get("token1_name"));
    liquidity.set('tokenSymbol0', pair.get("token0_symbol"));
    liquidity.set('tokenSymbol1', pair.get("token1_symbol"));
    liquidity.set('tokenAddress0', pair.get("token0_address"));
    liquidity.set('tokenAddress1', pair.get("token1_address"));
    liquidity.set('tokenReserve0', _reserves["_reserve0"]);
    liquidity.set('tokenReserve1', _reserves["_reserve1"]);
    liquidity.set('blockTimeStamp', _reserves["_blockTimestampLast"]);

    liquidity.save();

}


})
