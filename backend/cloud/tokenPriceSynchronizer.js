import {getTokenPriceHistory} from "../../avada_client/src/services/tokenService";


Moralis.Cloud.define("welcomeFunction", async () => {

    const startDate = new Date;
    startDate.setMonth(startDate.getMonth() - 1);
    const dateArray = getDates(startDate, Date.now())

    const priceHistory = await getTokenPriceHistory(address, dateArray);






})