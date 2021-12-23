import Moralis from "moralis";
import {getTokenPriceHistory} from "./tokenService";

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

export const synchronizeTokenPrice = async (address) => {

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

}




