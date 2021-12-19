Moralis.Cloud.define("fetchCurrentPrices", async () => {
  const TokenPrices = Moralis.Object.extend("TokenPrices");

  const newPrice = new TokenPrices();

  const options = {
    address: "0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB",
    chain: "avalanche",
  };

  const TokenDetails = await Moralis.Web3API.token.getTokenPrice(options);
  newPrice.set("tokenPrice", TokenDetails.usdPrice);
  newPrice.set("tokenSymbol", "ETH");

  newPrice.save().then(
    (price) => {
      // Execute any logic that should take place after the object is saved.
      alert("New object created with objectId: " + price.id);
    },
    (error) => {
      // Execute any logic that should take place if the save fails.
      // error is a Moralis.Error with an error code and message.
      alert("Failed to create new object, with error code: " + error.message);
    }
  );
});

Moralis.Cloud.job("PriceFetcher", async (request) => {
  await Moralis.Cloud.run("fetchCurrentPrices");
});
