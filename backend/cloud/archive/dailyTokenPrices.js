// This function is used to find the currect status of the summarization
// If there is some data already summarised, this will help to define the delta load
// Otherwise this will lead to a full load
Moralis.Cloud.define("findPreviousUpdates", async (request) => {
  const logger = Moralis.Cloud.getLogger();
  
  // Find the earliest timestamp where data is available
  const queryTokenPrices = new Moralis.Query("TokenPrices");
  const pipelineMin = [
    {match: {tokenSymbol: request.params.symbol}},
    {
      group: {
        objectId: {},
        minTimeStamp: {$min: "$timeStamp"}
    }
    }
  ]
    
  const minTimeStamp = (await queryTokenPrices.aggregate(pipelineMin))[0].minTimeStamp;

  // Find the latest timestamp where data is available
  const pipelineMax = [
    {match: {tokenSymbol: request.params.symbol}},
    {
    group: {
      objectId: {},
      maxTimeStamp: {$max: "$timeStamp"}
    }
  }]
  const maxTimeStamp = (await queryTokenPrices.aggregate(pipelineMax))[0].maxTimeStamp;

  // Find the last updates timestamp
  const queryTargetClass = new Parse.Query(request.params.targetClass);
  const pipelineTarget = [
    {match: {symbol: request.params.symbol}},
    {
    group: {
      objectId: {},
      targetTimeStamp: {$max: "$timeStamp"}
    }
  }]

  const result1 = await queryTargetClass.aggregate(pipelineTarget);

  //Calculate Last Updated TimeStamp
  let lastUpdatedTimeStamp;

  if (result1[0]) {
    // Some Data already populated. Start from the latest of the two time points
    lastUpdatedTimeStamp = Math.max(minTimeStamp, result1[0].targetTimeStamp)
  } else {
    // No data in the target table. So start from the beginning
    lastUpdatedTimeStamp = minTimeStamp; 
  }

  return [lastUpdatedTimeStamp, maxTimeStamp]
  
});


// This function is used to update the appropriate data into a specified targetclass
// Picks the correct data from source (given token, to and from)
// Then summarizes to get the metrics eg. min, max average
// Updates the target class (passed as a parameter)
Moralis.Cloud.define("updateSummary", async (request) => {
  const logger = Moralis.Cloud.getLogger();

  // Query Token Prices Class for the appropriate records
  const TokenPrices = Moralis.Object.extend("TokenPrices");
  const query = new Moralis.Query(TokenPrices);
  query.limit(5000);

  const queryPipeline = [
    {match: 
      {$and: [
        {tokenSymbol: request.params.symbol},
        {timeStamp: {$gt: request.params.from}},
        {timeStamp: {$lte: request.params.to}}
        ]
      }
    },
    {
    group: {
      objectId: {},
      averagePrice: {$avg: "$tokenPrice"},
      minPrice: {$min: "$tokenPrice"},
      maxPrice: {$max: "$tokenPrice"},
    }
  }]

  const result = await query.aggregate(queryPipeline);


  // Update the reqults in the class
  if (result.length > 0) {
     const obj = Moralis.Object.extend(request.params.targetClass);
     const newObj = new obj();

    newObj.set("symbol", request.params.symbol);
    newObj.set("timeStamp", request.params.to);
    newObj.set("averagePrice", result[0].averagePrice);
    newObj.set("minPrice", result[0].minPrice);
    newObj.set("maxPrice", result[0].maxPrice);

    newObj.save();

  }
});


// This function updates the appropriate values for a given interval
Moralis.Cloud.define("calculateSummary", async (request) => {

  const logger = Moralis.Cloud.getLogger();

  // Fetch the token details
  const TOKEN = Moralis.Object.extend("TokenDetails");
  const query = new Moralis.Query(TOKEN);
  query.select("symbol");
  const results = await query.find();
  
  for (i=0; i<results.length; i++){
    const token = results[i].get("symbol");

  const [lastUpdatedTimeStamp, maxTimeStamp] = await Moralis.Cloud.run("findPreviousUpdates", {symbol: token, targetClass: request.params.targetClass});

  let timeStamp = lastUpdatedTimeStamp;


  while (timeStamp < maxTimeStamp) {

    const fromTimeStamp = timeStamp;

      // Go to the end of the interval
      date = new Date(timeStamp);
      if (request.params.interval === "DAILY"){
        date.setDate(date.getDate() + 1);
        date.setHours(0,0,0,0);
      } else {
        date.setHours(date.getHours() + 1, 0, 0, 0); 
      }
      timeStamp = date.getTime();
    const toTimeStamp = timeStamp;

    if (toTimeStamp > maxTimeStamp){
      break;
    }
    
    // Run the function to update the summary into the target class
    await Moralis.Cloud.run("updateSummary", {
      symbol: token,
      from: fromTimeStamp,
      to: toTimeStamp,
      targetClass: request.params.targetClass
    });
  }
  }
});


// Daily Summary Job that will be scheduled
Moralis.Cloud.job("DailySummary", async (request) => {
  await Moralis.Cloud.run("calculateSummary", {
    interval: "DAILY",
    targetClass: "DailyTokenSummary"
  })
})

// Hourly Summary Job that will be scheduled
Moralis.Cloud.job("HourlySummary", async (request) => {
  await Moralis.Cloud.run("calculateSummary", {
    interval: "Hourly",
    targetClass: "HourlyTokenSummary"
  })
})


