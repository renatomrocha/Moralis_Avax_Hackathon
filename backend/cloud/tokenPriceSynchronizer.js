
const logger = Moralis.Cloud.getLogger();


const INCREMENT_UNITS = {
    HOURS :0,
    DAYS: 1
}


Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}


Date.prototype.addHours = function(h) {
    this.setTime(this.getTime() + (h*60*60*1000));
    return this;
}

const addToDate = (currentDate, units,delta) => {
    let updatedDate;
    switch (units) {
        case(INCREMENT_UNITS.DAYS):
            updatedDate = currentDate.addDays(delta);
            break;
        case(INCREMENT_UNITS.HOURS):
            // logger.info("Fetching data on hourly interval");
            updatedDate = currentDate.addHours(delta);
            break;
        default:
            throw Error("Unit type not supported");
    }
    return updatedDate;

}


const getDates = (startDate, stopDate, units, delta) => {
    var dateArray = new Array();
    var currentDate = startDate;
    while (currentDate <= stopDate) {
        const date = new Date (currentDate);
        // dateArray.push(`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`);
        dateArray.push(date);

        currentDate = addToDate(currentDate, units, delta);
    }
    // logger.info(`Will return date array`);

    return dateArray;
}

const getBlockFromDate = async (date) => {
    // logger.info(`Request for block on date ${date}`);
    const block = await Moralis.Web3API.native.getDateToBlock({chain:"avalanche",date:`${date}`});
    // logger.info(`Fetched block is ${block.block}`);
    return block;
}


const getTokenPrice = async (address , chain, to_date) => {

    const options  = {
        address: address,
        chain: chain?chain:"avalanche"
    };

    if (to_date) {
        const blockInfo = await getBlockFromDate(to_date);
        Object.assign(options,{to_block: blockInfo.block});
    }

    // logger.info(`Will request price on block ${options.to_block}`);

    const tokenPrice = await Moralis.Web3API.token.getTokenPrice(options);
    return tokenPrice;
}


const getTokenPriceHistory = async (address, dateInterval) => {
    const priceHistory = [];
    for (let date of dateInterval) {

        try {
            const price = await getTokenPrice(address, "avalanche", date);
            price["date"] = date;
            price["address"] = address;
            priceHistory.push(price);
        } catch (e) {
            logger.info(`Unable to get price for ${address} on date ${date.toString()}` );
            logger.error(`${e}`);
        }

    }
    // logger.info(`Successfully fetched ${priceHistory.length} of ${dateInterval.length}`)
    return priceHistory;
}


const storePrice = async () => {


}


const syncTokenPriceHistory = async (address, symbol,dateInterval) => {
    const TokenPrice = Moralis.Object.extend("TokenPrices");

    let test = null;
        try{
              test = await getTokenPrice(address, "avalanche", new Date);
        } catch (e) {
            logger.error(`Test fetch failed will skip token ${symbol}`);
            return;
        }

    for (let date of dateInterval) {
        try {
            const price = await getTokenPrice(address, "avalanche", date);
            price["date"] = date;
            price["address"] = address;
            const tokenPrice = new TokenPrice();
            tokenPrice.set("price", price.usdPrice);
            tokenPrice.set("address", price.address);
            tokenPrice.set("date", price.date);
            tokenPrice.set("exchange", price.exchangeName);

            tokenPrice.save().then(
                () => {
                    // logger.info(`${symbol} price at ${date} : OK`)
                },
                (error) => {
                    logger.error(`${symbol} price at ${date} : ERROR`)
                    logger.info(error);
                }
            );

        } catch (e) {
            logger.info(`Unable to get price for ${address} on date ${date.toString()}` );
            // logger.error(`${e}`);
        }

    }
}




// Required params: {monthsBack, -> Number of months to go back and start sync
//                      units, -> Interval units (hours or days)
//                       interval, ->  interval value ()
//                       address} -> Token address

Moralis.Cloud.define("syncHistoricalPriceForToken", async (request) => {


    const startDate = new Date(Date.parse("Aug 17, 2021"));

    const endDate = new Date(Date.parse("Dec 30, 2021"));

    const dateArray = getDates(startDate, Date.now(), INCREMENT_UNITS.HOURS, 1)


    await syncTokenPriceHistory(request.params.address,request.params.symbol, dateArray);


});

Moralis.Cloud.job("syncHistoricalPrices", async (request) => {

    const TOKEN = Moralis.Object.extend("TokenDetails");
    const query = new Moralis.Query(TOKEN);
    query.select("symbol", "address", "chain");
    const results = await query.find();
    const tokenList = results.map((r) => {
        return {
            address: r.get("address"),
            symbol: r.get("symbol")
        };
    });

    const syncedTokens = ["0x49d5c2bdffac6ce2bfdb6640f4f80f226bc10bab","0xc7198437980c041c805a1edcba50c1ce5db95118",
    "0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7","0x8ebaf22b6f053dffeaf46f4dd9efa95d89ba8580", "0x5947bb275c521040051d82396192181b413227a3",
    "0x63a72806098bd3d9520cc43356dd78afe5d386d9","0xd501281565bf7789224523144fe5d98e8b28f267","0x37b608519f91f70f2eeb0e5ed9af4061722e4f76",
    "0xd24c2ad096400b6fbcd2ad8b24e7acbc21a1da64", "0xb44a9b6905af7c801311e8f4e76932ee959c663c", "0x214db107654ff987ad859f34125307783fc8e387",
    "0x6e84a6216ea6dacc71ee8e6b0a5b7322eebc0fdd","0x6e84a6216ea6dacc71ee8e6b0a5b7322eebc0fdd","0x9e037de681cafa6e661e6108ed9c2bd1aa567ecd",
    "0xc7b5d72c836e718cda8888eaf03707faef675079", "0xd6070ae98b8069de6b494332d1a1a81b6179d960","0x60781c2586d68229fde47564546784ab3faca982",
    "0x8729438eb15e2c8b576fcc6aecda6a148776c0f5","0x961c8c0b1aad0c0b10a51fef6a867e3091bcef17","0xc38f41a296a4493ff429f1238e030924a1542e50",
    "0xd1c3f94de7e5b45fa4edbba472491a9f4b166fc4","0x59414b3089ce2af0010e7523dea7e2b35d776ec7", "0xa7d7079b0fead91f3e65f86e8915cb59c1a4c664",
        "0xd586e7f844cea2f87f50152665bcbc2c279d8d70","0xa32608e873f9ddef944b24798db69d80bbb4d1ed","0x0ebd9537a25f56713e34c45b38f421a1e7191469"]

    const filteredTokenList = tokenList.filter(t=>!syncedTokens.includes(t.address));


    const scriptStart = Date.now();

    for (let i = 0; i < filteredTokenList.length; i++) {
        const start = Date.now();
        logger.info(`START -------------> Starting sync for ${filteredTokenList[i].symbol}`);
        await Moralis.Cloud.run("syncHistoricalPriceForToken", {
            address: filteredTokenList[i].address,
            symbol: filteredTokenList[i].symbol
        });
        var end = Date.now();
        const finishTime = (end - start) * 1000 / 60;
        logger.info(`END -----------------> Sync for ${filteredTokenList[i].symbol} took ${finishTime} minutes`);
    }
    const scriptEnd = Date.now();
    const finishScriptTime = (scriptEnd - scriptStart) / 1000 / 60;
    logger.info(`END -----------------> All prices synced, job finished in ${finishScriptTime} minutes`);


})

