
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
    const scriptStart = Date.now();

    for (let i = 0; i < tokenList.length; i++) {
        const start = Date.now();
        logger.info(`START -------------> Starting sync for ${tokenList[i].symbol}`);
        await Moralis.Cloud.run("syncHistoricalPriceForToken", {
            address: tokenList[i].address,
            symbol: tokenList[i].symbol
        });
        var end = Date.now();
        const finishTime = (end - start) * 1000 / 60;
        logger.info(`END -----------------> Sync for ${tokenList[i].symbol} took ${finishTime} minutes`);
    }
    const scriptEnd = Date.now();
    const finishScriptTime = (scriptEnd - scriptStart) / 1000 / 60;
    logger.info(`END -----------------> All prices synced, job finished in ${finishScriptTime} minutes`);


})

