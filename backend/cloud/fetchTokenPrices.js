Moralis.Cloud.define("fetchCurrentPrices", async (request) => {
  const logger = Moralis.Cloud.getLogger();
  // logger.info(request.params.tokens);
  const Token15Min = Moralis.Object.extend("Token15Min");

  const newPrice = new Token15Min();

  const options = {
    address: request.params.address,
    chain: "avalanche",
  };

  const TokenDetails = await Moralis.Web3API.token
    .getTokenPrice(options)
    .catch((e) =>
      logger.info(`Could not fetch price for token: ${request.params.symbol}`)
    );

  if (TokenDetails) {
    newPrice.set("price", TokenDetails.usdPrice);
    newPrice.set("symbol", request.params.symbol);
    newPrice.set("address", request.params.address);

    let nowDate = new Date();
    newPrice.set("timeStamp", nowDate.getTime());

    newPrice.save().then(
      (price) => {
        alert("New object created with objectId: " + price.id);
      },
      (error) => {
        alert("Failed to create new object, with error code: " + error.message);
      }
    );
  }
});

Moralis.Cloud.job("PriceFetcherNew", async (request) => {
  const TOKEN = Moralis.Object.extend("TokenDetails");
  const query = new Moralis.Query(TOKEN);
  query.select("symbol", "address");
  const results = await query.find();
  const tokenList = results.map((r) => {
    return {
      address: r.get("address"),
      symbol: r.get("symbol"),
    };
  });

  // const logger = Moralis.Cloud.getLogger();
  // tokenList.forEach((element) => {
  //   logger.info(element.address);
  // });

  for (i = 0; i < tokenList.length; i++) {
    // logger.info(tokenList[i].symbol);
    await Moralis.Cloud.run("fetchCurrentPrices", {
      symbol: tokenList[i].symbol,
      address: tokenList[i].address,
    });
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
