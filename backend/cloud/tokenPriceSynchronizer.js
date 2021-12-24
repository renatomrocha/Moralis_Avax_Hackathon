const logger = Moralis.Cloud.getLogger();

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

const getDates = (startDate, stopDate) => {
    var dateArray = new Array();
    var currentDate = startDate;
    while (currentDate <= stopDate) {
        const date = new Date (currentDate);
        dateArray.push(`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`);
        currentDate = currentDate.addDays(1);
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

Moralis.Cloud.job("syncHistoricalPrices", async (request) => {

    logger.info("Job Started!!");
    logger.info("Starting sync job with request params: ", request.params);

    const startDate = new Date;
    startDate.setMonth(startDate.getMonth() - 6);
    const dateArray = getDates(startDate, Date.now())

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

