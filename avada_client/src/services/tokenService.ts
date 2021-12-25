import Moralis from "moralis";
import {getBlockFromDate} from "./miscService";

export const getTokenList = async () : Promise<any[]> => {

    const TOKEN = Moralis.Object.extend("Token")
    const query = new Moralis.Query(TOKEN);
    query.select("name", "id","address","symbol");
    const results = await query.find();
    const tokenList = results.map((r)=>{
        return {name:r.get("name"),address: r.get("address"),symbol: r.get("symbol")}
    });
    console.log("Got results: ", tokenList);
    return tokenList;
}

export const getTokenByAddress = async (address: any) => {
    const TOKEN = Moralis.Object.extend("Token")
    const query = new Moralis.Query(TOKEN);
    query.select("name", "id","address","symbol");
    query.equalTo("address", address);
    const results = await query.find();
    const tokenInfo = results.map((r)=>{
        return {name:r.get("name"),address: r.get("address"),symbol: r.get("symbol")}
    });
    console.log("Token info: ", tokenInfo);
    return tokenInfo[0];
}


export const getTokenPrice = async (address : any , chain: any, to_date?: any) => {

    const options  = {
        address: address,
        chain: chain?chain:"avalanche"
    };

    if (to_date) {
        const blockInfo = await getBlockFromDate(to_date);
        Object.assign(options,{to_block: blockInfo.block});
    }

    const tokenPrice = await Moralis.Web3API.token.getTokenPrice(options);
    console.log(`Price for token with address ${address} is ${tokenPrice}`);
    return tokenPrice;
}


export const getTokenPriceHistory = async (address:any, dateInterval: string[]) => {
    const priceHistory = [];
    for(let date of dateInterval) {
        console.log("Date is: ", date);
        try {
            const price : any = await getTokenPrice(address, "avalanche", date);
            price["date"] = new Date(date);
            price["address"] = address;
            priceHistory.push(price);
        } catch (e) {
            console.log("Error getting price")
        }

    }
    console.log("Price history is: ", priceHistory);
    return priceHistory;
}

export const getTokenPriceHistoryDB = async (address : any, timeInterval? : any[]) => {
    const TokenPrice = Moralis.Object.extend("TokenPrices")
    const query = new Moralis.Query(TokenPrice);
    query.select("price", "id", "date");
    query.equalTo("address", address);
    const results = await query.find();
    const tokenPrices = results.map((r)=>{
        // const dex = r;
        return {price:r.get("price"),name: r.get("date")}
    });
    console.log("Got results: ", tokenPrices);
    return tokenPrices;

}


