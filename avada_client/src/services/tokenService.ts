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


export const getTokenPrice = async (address : string, chain: string, to_date?: string) => {

    const options : any = {
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


export const getTokenPriceHistory = async (address:string, dateInterval: string[]) => {
    const priceHistory = [];
    for(let date of dateInterval) {
        console.log("Date is: ", date);
        try {
            const price = await getTokenPrice(address, "avalanche", date);
            priceHistory.push(price);
        } catch (e) {
            console.log("Error getting price")
        }

    }
    console.log("Price history is: ", priceHistory);
    return priceHistory;
}

