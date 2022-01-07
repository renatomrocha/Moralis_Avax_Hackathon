import Moralis from "moralis";
import {getBlockFromDate} from "./miscService";

export const getTokenList = async () : Promise<any[]> => {

    const TOKEN = Moralis.Object.extend("TokenDetails")
    const query = new Moralis.Query(TOKEN);
    query.select("name", "id","address","symbol","logoUrl");
    const results = await query.find();
    const tokenList = results.map((r)=>{
        return {name:r.get("name"),address: r.get("address"),symbol: r.get("symbol"), logoUrl: r.get("logoUrl")}
    });
    console.log("Got results: ", tokenList);
    return tokenList;
}

export const getTokenByAddress = async (address: any) => {
    const TOKEN = Moralis.Object.extend("TokenDetails")
    const query = new Moralis.Query(TOKEN);
    query.select("name", "id","address","symbol","logoUrl");
    query.equalTo("address", address);
    const results = await query.find();
    const tokenInfo = results.map((r)=>{
        return {name:r.get("name"),address: r.get("address"),symbol: r.get("symbol"), logoUrl: r.get("logoUrl")}
    });
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
    console.log(`Price for token with address ${address} is ${tokenPrice.usdPrice}`);
    return tokenPrice;
}


export const getTokenMetadata = async (address : any , chain?: any) => {
    const options : any  = {
        addresses: address,
        chain: chain?chain:"avalanche"
    };
    const metadata = await Moralis.Web3API.token.getTokenMetadata(options);
    return metadata;
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

export const getTokenPriceHistoryDB = async (address : any, dateInterval? : any) => {
    const TokenPrice = Moralis.Object.extend("Token15Min")
    const query = new Moralis.Query(TokenPrice);
    query.select("price", "id", "timeStamp","exchange");
    query.equalTo("address", address);
    if(dateInterval) {
        query.greaterThan("timeStamp", dateInterval)
    }
    query.ascending("date");
    query.limit(5000);
    const results = await query.find();
    const tokenPrices = results.map((r)=>{
        // const dex = r;
        return {price:r.get("price"),timestamp: r.get("timeStamp"), exchange:r.get("exchange")}
    });
    console.log("Got results: ", tokenPrices);
    return tokenPrices;

}


export const getTokenLogoUrls = async () : Promise<any[]>  => {
    const TokenLogo = Moralis.Object.extend("TokenLogos")
    const query = new Moralis.Query(TokenLogo);
    query.select("address", "logoUrl");
    // query.equalTo("address", address);
    const tokenUrls = await query.find();
    const urls = tokenUrls.map(tu=>{
        return{'logoUrl': tu.get("logoUrl"), 'address': tu.get('address')}
    })
    return urls;

}






