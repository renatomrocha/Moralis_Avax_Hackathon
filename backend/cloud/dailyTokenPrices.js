Moralis.Cloud.job("CalculateDailyPrice", async (request) => {
  const logger = Moralis.Cloud.getLogger();
  let yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  yesterday.setHours(0, 0, 0, 0);

  const TokenPrices = Moralis.Object.extend("TokenPrices");
  const query = new Moralis.Query(TokenPrices);
  query.select("tokenSymbol", "tokenPrice", "date");
  query.equalTo("date", yesterday);
  const results = await query.find();

  const uniqueTokens = [
    ...new Set(results.map((item) => item.get("tokenSymbol"))),
  ];

  for (i = 0; i < uniqueTokens.length; i++) {
    const tokenData = results.filter((item) => {
      return item.get("tokenSymbol") === uniqueTokens[i];
    });

    const priceValues = tokenData.map((item) => item.get("tokenPrice"));

    const averagePrice =
      priceValues.reduce((a, b) => a + b) / priceValues.length;

    const DailyTokenPrices = Moralis.Object.extend("DailyTokenPrices");
    const newDailyPrice = new DailyTokenPrices();

    newDailyPrice.set("symbol", uniqueTokens[i]);
    newDailyPrice.set("date", yesterday);
    newDailyPrice.set("averagePrice", averagePrice);

    newDailyPrice.save().then(
      (price) => {
        alert("New object created with objectId: " + price.id);
      },
      (error) => {
        alert("Failed to create new object, with error code: " + error.message);
      }
    );
  }
});
