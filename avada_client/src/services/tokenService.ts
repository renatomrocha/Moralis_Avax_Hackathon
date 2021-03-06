import Moralis from "moralis";
import {getBlockFromDate} from "./miscService";

export const getTokenList = async () : Promise<any[]> => {

    const TOKEN = Moralis.Object.extend("TokenDetails")
    const query = new Moralis.Query(TOKEN);
    query.select("name", "id","address","symbol","logoUrl", "currentPrice", "currentMarketCap", "pctPriceChange24Hr");
    const results = await query.find();
    const tokenList = results.filter((r)=>r.get("symbol") != 'SUSHI.e' && r.get("symbol") != 'SNOB' && r.get("symbol") != 'ANY').map((r)=>{
        return {name:r.get("name"),address: r.get("address"),symbol: r.get("symbol"), logoUrl: r.get("logoUrl"),
            price: r.get("currentPrice").toFixed(2), marketCap: r.get("currentMarketCap"), pctChange: (r.get("pctPriceChange24Hr")*100).toFixed(2)}
    });
    return tokenList;
}


export const getToken = async (address : string) : Promise<any> => {

    const TOKEN = Moralis.Object.extend("TokenDetails")
    const query = new Moralis.Query(TOKEN);
    query.select("name", "id","address","symbol","logoUrl", "currentPrice", "currentMarketCap", "pctPriceChange24Hr");
    query.equalTo("address", address);
    const results = await query.find();

    console.log("Token: ", results);
    const tokenList = results.filter((r)=>r.get("symbol") != 'SUSHI.e' && r.get("symbol") != 'SNOB' && r.get("symbol") != 'ANY').map((r)=>{
        return {name:r.get("name"),address: r.get("address"),symbol: r.get("symbol"), logoUrl: r.get("logoUrl"),
            price: r.get("currentPrice").toFixed(2), marketCap: r.get("currentMarketCap"), pctChange: (r.get("pctPriceChange24Hr")*100).toFixed(2)}
    });

    return tokenList[0];
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


export const getCorrelationsOld = async (tokens: any[]) => {

    let Correlations = Moralis.Object.extend("TokenPriceCorelation");
    const query = new Moralis.Query(Correlations);
    query.ascending("symbol0");
    query.containedIn("symbol0", tokens );
    query.containedIn("symbol1", tokens );

    query.limit(500);
    const results = await query.find();
    const correlation = results.map((r)=>{
        const obj = {correlation: r.get("correlation")?r.get("correlation"):0, symbol0:r.get("symbol0"), symbol1: r.get("symbol1")};
        return obj;
    });

    const finalData = [...correlation];


    console.log("Data received: ", finalData);

    const keys = [...new Set(correlation.map((r)=>r.symbol0))];
    const keys2 = [...new Set(correlation.map((r)=>r.symbol1))];
    const finalResult: any[] = [];
    keys.forEach((key)=> {
        const obj : any = {};
        const keyCorrs = correlation.filter((c)=>c.symbol0 === key && tokens.includes(c.symbol1));
        obj[key] = 1;
        keyCorrs.forEach((kc)=>{
            obj[kc.symbol1] = kc.correlation;
        })
        finalResult.push(obj);
    })
    const finalResult2: any[] = [];

    keys2.forEach((key, idx) => {
        const obj : any = {};
        const keyCorrs = correlation.filter((c)=>c.symbol1 === key && tokens.includes(c.symbol0));
        obj[key] = 1;
        keyCorrs.forEach((kc)=>{
            obj[kc.symbol0] = kc.correlation;
        })
        finalResult2.push(obj);
    })

    const finalResults3 = [...finalResult, ...finalResult2];
    const idxToMerge : any[] = [];
    finalResults3.forEach((fr, idx)=>{
        if(Object.keys(fr).length < tokens.length) {
            // Someting is wrong here
            const key : any = Object.keys(fr).find(key => fr[key] === 1)
            const idxsToMerge : any[] = finalResults3.map((f,idx)=>{
                if(f[key]==1){
                    return idx;
                }
            }).filter(r=>r!=undefined);


            const newObj = {};
            idxsToMerge.forEach((i:any)=>{
                Object.assign(newObj, finalResults3[i]);
            })


            idxToMerge.push([idxsToMerge]);
            finalResults3[idx] = newObj;

            idxsToMerge.forEach((i:any)=>{
                if(i != idx) {
                    finalResults3.splice(i);
                }
            })
            console.log("idx to merge: ", idxsToMerge);
            console.log("Key is: ", key);
        }
    })

    const result = finalResults3
        // .splice(idxToMerge[0][0]);

    console.log("Indexes to merge: ", idxToMerge);
    console.log("___________- Final result");
    console.log(finalResults3.map((fr)=>Object.keys));

    return result;
}




export const getCorrelations= async (tokens: any[]) => {

    let Correlations = Moralis.Object.extend("TokenPriceCorelation");
    const query = new Moralis.Query(Correlations);
    query.ascending("symbol0");
    query.containedIn("symbol0", tokens );
    query.containedIn("symbol1", tokens );

    query.limit(500);
    const results = await query.find();
    const correlation = results.map((r)=>{
        const obj = {correlation: r.get("correlation")?r.get("correlation"):0, symbol0:r.get("symbol0"), symbol1: r.get("symbol1")};
        return obj;
    });





    const keys = [...new Set(correlation.map((r)=>r.symbol0))];
    const keys2 = [...new Set(correlation.map((r)=>r.symbol1))];

    const finalKeys = [...new Set([...keys, ...keys2])];


    console.log("Final keys: ", finalKeys);
    const finalResult: any[] = [];
    finalKeys.forEach((mainKey)=> {
        const obj : any = {};
        const keyCorrs = correlation.filter((c)=>c.symbol0 === mainKey && tokens.includes(c.symbol1));
        const keyCorrs2 = correlation.filter((c)=>c.symbol1 === mainKey && tokens.includes(c.symbol0));
        const combinations = [...keyCorrs, ...keyCorrs2];
        console.log("Combinations: ", combinations);
        obj[mainKey] = 1;
        combinations.forEach((combination : any)=>{
            // kToAdd must be a token symbol (symbol0 or symbol1)
            const kToAdd = Object.keys(combination).filter((key)=>{
               if( combination[key] != mainKey && key != 'correlation') {
                    return combination[key];
               }
            })[0];

            obj[combination[kToAdd]] = combination.correlation;
        })
        console.log("Will push object: ", obj);
        finalResult.push(obj);
    })


    const result = finalResult
    // .splice(idxToMerge[0][0]);

    console.log("___________- Final result");
    console.log(finalResult);

    return result;
}