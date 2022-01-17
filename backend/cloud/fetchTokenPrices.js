Moralis.Cloud.job("FetchTokenDetails", async (request) => {

  Moralis.settings.setAPIRateLimit({
  anonymous:100, authenticated:100, windowMs:60000
})

  const logger = Moralis.Cloud.getLogger();

  const TOKEN = Moralis.Object.extend("TokenDetails");
  const query = new Moralis.Query(TOKEN);
  query.select("symbol", "address", 'abi', 'decimals', 'canFetchTokenDetails', 'gecko_id');
  const results = await query.find();

  // logger.info(`Total number of tokens: ${results.length}`)

  for (i=0; i<results.length; i++) {
    const r = results[i];
    if (r.get('canFetchTokenDetails') === 1){
      let price;
      let totalSupply;
      let marketCap;
      let geckoMarketCap;
      try{
        const priceOptions = {address: r.get("address"), chain: "avalanche",};
        const priceResult = await Moralis.Web3API.token.getTokenPrice(priceOptions)
        price = priceResult.usdPrice;
      } catch (e) {
        // logger.error(`${e}`);
        // logger.info(`Failed to fetch price for token: ${r.get("symbol")}`);
      }

      try{
        const strAbi = [{"inputs": [],"name": "totalSupply","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"}]
        // const strAbi = JSON.parse(r.get("abi").toString().replaceAll("'",'"').replaceAll("False",'"False"').replaceAll("True",'"True"'))
        const mcapOptions = {chain: "avalanche", address: r.get("address"), function_name: "totalSupply", abi: strAbi};
        totalSupply = parseInt(await Moralis.Web3API.native.runContractFunction(mcapOptions)) / 10**r.get("decimals");
      } catch (e) {
        // logger.error(`${e}`);
        // logger.info(`Failed to fetch totalSupply for token: ${r.get("symbol")}`);
      }

      if (r.get('gecko_id') !== '') {

        const dateObj = new Date();
        const date_string = dateObj.getDate().toString() + '-' + (dateObj.getMonth() + 1).toString() + '-' + dateObj.getFullYear().toString();
        const url = "https://api.coingecko.com/api/v3/coins/" + r.get('gecko_id') + "/history?date=" + date_string;
        const response = await Moralis.Cloud.httpRequest({url: url})
                                            .catch((e) => {
                                              logger.info(`Gecko request failed for token: ${r.get("symbol")}` + e.status);
                                            })
        geckoMarketCap = JSON.parse(response.text)['market_data']['market_cap']['usd'];

      }
      marketCap = totalSupply  * price;

      const Token15Min = Moralis.Object.extend("Token15Min");
      const newTokenDetail = new Token15Min();

      newTokenDetail.set('symbol', r.get("symbol"));
      newTokenDetail.set('address', r.get("address"));
      newTokenDetail.set('timeStamp', parseInt(new Date().getTime()/1000)),
      newTokenDetail.set('price', price);
      newTokenDetail.set('totalSupply', totalSupply);
      newTokenDetail.set('marketCap', marketCap);
      newTokenDetail.set('geckoMarketCap', geckoMarketCap);

      newTokenDetail.save()
    }
    

  }

});


Moralis.Cloud.define("timeStampUpdater", async (request) => {
  const TokenPrices = Moralis.Object.extend("TokenPrices");
  const query = new Moralis.Query(TokenPrices);
  query.select("createdAt");
  query.limit(5000);
  const results = await query.find();

  results.map((item) => {
    item.set("timeStamp", item.get("createdAt").getTime());
    item.save();
  });
});
