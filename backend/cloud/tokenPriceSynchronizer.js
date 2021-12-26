
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
            logger.info("Fetching data on monthly interval");
            break;
        case(INCREMENT_UNITS.HOURS):
            logger.info("Fetching data on hourly interval");
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
    return dateArray;
}

const getBlockFromDate = async (date) => {
    const block = await Moralis.Web3API.native.getDateToBlock({chain:"avalanche",date:date});
    return block;
}

const getTokenPrice = async (address , chain, to_date) => {

    const options  = {
        address: address,
        chain: chain?chain:"avalanche"
    };

    logger.info("Options");

    if (to_date) {
        const blockInfo = await getBlockFromDate(to_date);
        Object.assign(options,{to_block: blockInfo.block});
    }

    logger.info(options);

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
            logger.info("Unable to get price for date: ", date);
            logger.error(e);
        }

    }
    logger.info("Finished fetching prices");
    logger.info(`Successfully fetched ${priceHistory.length} of ${dateInterval.length}`)
    return priceHistory;
}

// Required params: {monthsBack, -> Number of months to go back and start sync
//                      units, -> Interval units (hours or days)
//                       interval, ->  interval value ()
//                       address} -> Token address

Moralis.Cloud.define("syncHistoricalPriceForToken", async (request) => {

    logger.info("Job Started!!");
    logger.info(`Starting sync job with params`);
    logger.info(`Address ${request.params.address}`);
    logger.info(`Units ${request.params.units}`);
    logger.info(`Interval ${request.params.interval}`);
    logger.info(`monthsBack ${request.params.monthsBack}`);

    const startDate = new Date;
    startDate.setMonth(startDate.getMonth() - request.params.monthsBack);
    const dateArray = getDates(startDate, Date.now(), request.params.units, request.params.interval)

    const priceHistory = await getTokenPriceHistory(request.params.address, dateArray);

    const TokenPrice = Moralis.Object.extend("TokenPrices");

    for (let price of priceHistory) {
        const tokenPrice = new TokenPrice();
        tokenPrice.set("price", price.usdPrice);
        tokenPrice.set("address", price.address);
        tokenPrice.set("date", price.date);
        tokenPrice.set("exchange", price.exchangeName);
        tokenPrice.save().then(
            (price) => {
                logger.info("Price successfully stored")
            },
            (error) => {
                logger.error("Failed to store price ");
                logger.info(error);
            }
        );
    }
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

    for (let i = 0; i < tokenList.length; i++) {
        logger.info(`Running price sync for ${tokenList[i].symbol}`);
        await Moralis.Cloud.run("syncHistoricalPriceForToken", {
            address: tokenList[i].address,
            monthsBack: 1,
            units: INCREMENT_UNITS.HOURS,
            interval: 1
        });
    }

})

