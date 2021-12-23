import {getTokenPrice, getTokenPriceHistory} from "../../avada_client/src/services/tokenService";
import Moralis from "moralis";

Moralis.Cloud.define("welcomeFunction", async () => {

    const logger = Moralis.Cloud.getLogger();

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
            }

        }
        logger.info("Finished fetching prices");
        logger.info(`Successfully fetched ${priceHistory.length} of ${dateInterval.length}`)
        return priceHistory;
    }


    const startDate = new Date;
    startDate.setMonth(startDate.getMonth() - 6);
    const dateArray = getDates(startDate, Date.now())

    const priceHistory = await getTokenPriceHistory(address, dateArray);

    const TokenPrice = Moralis.Object.extend("TokenPrices");

    for (let price of priceHistory) {
        const tokenPrice = new TokenPrice();
        console.log("Trying to store: ", price);
        tokenPrice.set("price", price.usdPrice);
        tokenPrice.set("address", price.address);
        tokenPrice.set("date", price.date);
        tokenPrice.set("exchange", price.exchangeName);

        tokenPrice.save().then(
            (price) => {
                console.log("Price successfully stored")
            },
            (error) => {
                console.log("Failed to store price " + error.message);
            }
        );
    }
});

