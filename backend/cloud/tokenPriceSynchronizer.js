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

const startDate = new Date;
startDate.setMonth(startDate.getMonth() -3);
const dateArray = getDates(startDate, Date.now())

console.log("Date array is: ", dateArray);


// Moralis.Cloud.define("synchronizeTokenPrice", async (request)=> {
//
//     // Get dates between specified interval
//
//
//     // Loop over dates -> Get blockByDate
//
//     // try fetch price and append to array
//
//     // Save object on database
//
//
//
//
//
//
//
// })

