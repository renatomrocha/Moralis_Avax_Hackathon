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
            console.log("Timestamp date : ", date);
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

export const getTokenPriceHistoryDB = async (address : any, interval: string, since? : any, upTo? : any) : Promise<any>=> {
    console.log("Received class name: ", interval);
    console.log("Asking prices previous to: ", since);
    let TokenPrice = Moralis.Object.extend(interval);
    const query = new Moralis.Query(TokenPrice);
    const fetchFromAverage = (interval=="Token1Day" || interval=="Token4Hour" || interval=="Token1Hour");
    const priceKey = fetchFromAverage?"averagePrice":"price";
    query.select(priceKey, "id", "timeStamp","exchange", "symbol", "pctChange");
    query.equalTo("address", address);
    if(since) {
        query.greaterThan("timeStamp", since)
    }
    if (upTo) {
        query.lessThan("timeStamp", upTo);
    }
    query.ascending("timeStamp");
    query.limit(5000);
    const results = await query.find();
    const tokenPrices = results.map((r)=>{
        const obj = {price:fetchFromAverage?r.get("averagePrice"):r.get("price"),timestamp: r.get("timeStamp"), exchange:r.get("exchange"), symbol: r.get("symbol")};
        if(interval!=='Token15Min')
            Object.assign(obj,{pctChange: r.get("pctChange")})

        return obj;
    });
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

export const getTokenLogoUrlForAddress = async (address: string) : Promise<any>  => {
    const TokenLogo = Moralis.Object.extend("TokenLogos")
    const query = new Moralis.Query(TokenLogo);
    query.select("address", "logoUrl");
    query.equalTo("address", address);
    const tokenUrl = await query.find();
    return tokenUrl[0];
}




export const fetchTokensForHeatMap = async (intervalStep : any, interval : any) => {

    const tokens = await getTokenList();
    const tokenPricesForHeat : any[] = [];
    await Promise.all(tokens.map(async (t) => {
        const prices = await getTokenPriceHistoryDB(t.address, intervalStep, interval)
        console.log("Prices: ", prices);
        const freshRecord: { timestamp: any; symbol: any; price: any; pctChange: any }[] = [];
        prices.map((p:any)=>{
            freshRecord.push({"timestamp":p.timestamp,"symbol":p.symbol, "price":p.price, "pctChange": p.pctChange});
        });
        tokenPricesForHeat.push(...freshRecord);
    }))
    console.log("Got token prices for heat: ", tokenPricesForHeat.length);
    return tokenPricesForHeat;

}



export const fetchTokensPercentageChangeForHeatMap = async (intervalStep : any, interval : any) => {

    const tokens = await getTokenList();
    const tokenPricesForHeat : any[] = [];
    await Promise.all(tokens.map(async (t) => {
        const prices = await getTokenPriceHistoryDB(t.address, intervalStep, interval)
        console.log("Prices: ", prices);
        const freshRecord: { timestamp: any; symbol: any; price: any; pctChange: any }[] = [];
        prices.map((p:any)=>{
            freshRecord.push({"timestamp":p.timestamp,"symbol":p.symbol, "price":p.price, "pctChange": p.pctChange});
        });
        tokenPricesForHeat.push(...freshRecord);
    }))
    console.log("Got token prices for heat: ", tokenPricesForHeat.length);
    return tokenPricesForHeat;

}




