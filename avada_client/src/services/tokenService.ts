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


export const getTokenPrice = async (address : any , chain?: any, to_date?: any) => {

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


export const getTokenPriceFromDB = async (address : any) => {
    const TokenPrice = Moralis.Object.extend("Token15Min")
    const query = new Moralis.Query(TokenPrice);

    query.select("timeStamp","price", "address", "marketCap");

    query.equalTo("address", address);
    query.descending("timeStamp");
    query.limit(1);
    const result = await query.find();
    return {price: result[0]?.get("price").toFixed(2), address: result[0]?.get("address"), marketCap: result[0]?.get("marketCap")};
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

export const getTokenPriceHistoryDB = async (address : any, interval: string, since? : any, upTo? : any, candle? : boolean) : Promise<any>=> {
    console.log("Received class name: ", interval);
    // console.log("Asking prices previous to: ", since);
    let TokenPrice = Moralis.Object.extend(interval);
    const query = new Moralis.Query(TokenPrice);
    const fetchFromAverage = (interval=="Token1Day" || interval=="Token4Hour" || interval=="Token1Hour");
    const priceKey = fetchFromAverage?"averagePrice":"price";

    if(candle) {
        if(!fetchFromAverage)
            throw new Error("Interval not supported for candle data")

        query.select(priceKey, "closePrice","openPrice", "maximumPrice","minimumPrice","id", "timeStamp","exchange", "symbol", "pctChange");
    } else {
        query.select(priceKey, "id", "timeStamp","exchange", "symbol", "pctChange");
    }


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
        const obj : any = {price:fetchFromAverage?r.get("averagePrice"):r.get("price"),timestamp: r.get("timeStamp"), exchange:r.get("exchange"), symbol: r.get("symbol")};
        if (candle) {
            const candlePrices = {
                closePrice: r.get("closePrice"),
                openPrice: r.get("openPrice"),
                maximumPrice:r.get("maximumPrice"),
                minimumPrice:r.get("minimumPrice")
            }
            Object.assign(obj, {...candlePrices})
        }

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




export const fetchTokensForHeatMap = async (intervalStep : any, since?: any, upTo?: any, filterTokens:any[] = []) => {

    let tokens = await getTokenList();
    if(filterTokens.length > 0) {
        tokens = tokens.filter((t:any)=>filterTokens.includes(t.symbol));
    }
    const tokenPricesForHeat : any[] = [];
    await Promise.all(tokens.map(async (t) => {
        const prices = await getTokenPriceHistoryDB(t.address, intervalStep, since, upTo)
        const freshRecord: { timestamp: any; symbol: any; price: any; pctChange: any }[] = [];
        prices.reverse().map((p:any)=>{
            freshRecord.push({"timestamp":p.timestamp,"symbol":p.symbol, "price":p.price, "pctChange": p.pctChange});
        });
        tokenPricesForHeat.push(...freshRecord);
    }))
    return tokenPricesForHeat;

}



const fetchCandleData = async (address : any, interval: string, since? : any, upTo? : any) : Promise<any>=> {
    console.log("Received class name: ", interval);
    // console.log("Asking prices previous to: ", since);
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