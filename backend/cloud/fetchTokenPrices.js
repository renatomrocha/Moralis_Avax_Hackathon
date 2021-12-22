Moralis.Cloud.define("fetchCurrentPrices", async (request) => {
  // const logger = Moralis.Cloud.getLogger();
  // logger.info(request.params.tokens);
  const TokenPrices = Moralis.Object.extend("TokenPrices");

  const newPrice = new TokenPrices();

  const TokenDetails = await Moralis.Web3API.token.getTokenPrice({
    address: request.params.address,
    chain: request.params.chain,
  });
  newPrice.set("tokenPrice", TokenDetails.usdPrice);
  newPrice.set("tokenSymbol", request.params.symbol);

  let nowDate = new Date();
  nowDate.setHours(0, 0, 0, 0);
  newPrice.set("date", nowDate);

  newPrice.save().then(
    (price) => {
      alert("New object created with objectId: " + price.id);
    },
    (error) => {
      alert("Failed to create new object, with error code: " + error.message);
    }
  );
});

Moralis.Cloud.job("PriceFetcher", async (request) => {
  const TOKEN = Moralis.Object.extend("TokenDetails");
  const query = new Moralis.Query(TOKEN);
  query.select("symbol", "address", "chain");
  const results = await query.find();
  const tokenList = results.map((r) => {
    return {
      chain: r.get("chain"),
      address: r.get("address"),
      symbol: r.get("symbol"),
    };
  });

  // const logger = Moralis.Cloud.getLogger();
  // tokenList.forEach((element) => {
  //   logger.info(element.address);
  // });

  for (i = 0; i < tokenList.length; i++) {
    await Moralis.Cloud.run("fetchCurrentPrices", {
      symbol: tokenList[i].symbol,
      address: tokenList[i].address,
      chain: tokenList[i].chain,
    });
  }
});
