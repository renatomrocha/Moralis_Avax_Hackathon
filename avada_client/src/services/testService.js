import Moralis from "moralis";
import {getTokenPriceHistory} from "./tokenService";


export const INCREMENT_UNITS = {
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


const addToDate = (currentDate, units,delta) => {
    let updatedDate;
    switch (units) {
        case(INCREMENT_UNITS.DAYS):
            updatedDate = currentDate.addDays(delta);
            break;
        case(INCREMENT_UNITS.HOURS):
            updatedDate = currentDate.addHours(delta);
            break;
        default:
            throw Error("Unit type not supported");
    }
    return updatedDate;

}




export const synchronizeTokenPrice = async (address, monthsBack,units, interval) => {

    const startDate = new Date;
    startDate.setMonth(startDate.getMonth() - monthsBack);
    const dateArray = getDates(startDate, Date.now(),units, interval);

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




