// import Moralis from "moralis";



import {getBlockFromDate} from "./miscService";
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
    startDate.setMonth(startDate.getMonth() -1);
    const dateArray = getDates(startDate, Date.now())

    const priceHistory = await getTokenPriceHistory(address,dateArray);

    // console.log("Date array is: ", dateArray);
    // const blocks = [];
    // console.log("Starting loading blocks");
    // for(let date of dateArray) {
    //     // console.log("Date: ", date);
    //     try {
    //         const block = await getBlockFromDate(date);
    //
    //         blocks.push(block);
    //     } catch (e) {
    //         console.log(`Error fetching block at ${date}`);
    //         console.log(e);
    //     }
    //
    // }

    console.log("Price history----> ", priceHistory);

}




