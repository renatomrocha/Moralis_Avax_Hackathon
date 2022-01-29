import {getTokenPrice} from "./tokenService";
import Moralis from "moralis";





export const getTopGainers = async () => {
    const TokenPrice = Moralis.Object.extend("TokenDetails")
    const query = new Moralis.Query(TokenPrice);
    query.select("pctPriceChange24Hr", "id", "timeStamp","exchange", "symbol", "logoUrl");
    query.descending("pctPriceChange24Hr");
    const results = await query.find();
    const gainers = results.filter((r)=>r.get("symbol") != 'SUSHI.e' && r.get("symbol") != 'SNOB' && r.get("symbol") != 'ANY').map((r)=>{
        return {pctChange: r.get("pctPriceChange24Hr"), symbol: r.get("symbol"), logoUrl: r.get("logoUrl")}
    })
    return gainers.slice(0,5).filter((r)=>r.pctChange>0);
}



export const getTopLosers = async () => {
    const TokenPrice = Moralis.Object.extend("TokenDetails")
    const query = new Moralis.Query(TokenPrice);
    query.select("pctPriceChange24Hr", "id", "timeStamp","exchange", "symbol", "logoUrl");
    query.ascending("pctPriceChange24Hr");
    const results = await query.find();
    const gainers = results.filter((r)=>r.get("symbol") != 'SUSHI.e' && r.get("symbol") != 'SNOB' && r.get("symbol") != 'ANY').map((r)=>{
        return {pctChange: r.get("pctPriceChange24Hr"), symbol: r.get("symbol"), logoUrl: r.get("logoUrl")}
    })
    return gainers.slice(0,5).filter((r)=>r.pctChange<0);;
}


export const getTopMCap = async () => {
    const TokenPrice = Moralis.Object.extend("TokenDetails")
    const query = new Moralis.Query(TokenPrice);

    query.select("currentMarketCap", "id", "symbol", "logoUrl");
    query.descending("currentMarketCap");
    const results = await query.find();
    const gainers = results.filter((r)=>r.get("symbol") != 'SUSHI.e' && r.get("symbol") != 'SNOB' && r.get("symbol") != 'ANY').map((r)=>{
        return {marketCap: r.get("currentMarketCap"), symbol: r.get("symbol"), logoUrl: r.get("logoUrl")}
    })
    const top5 = gainers.slice(0,5);

    const result = top5.map((t:any)=> {
        return{'marketCap':(t.marketCap/(10**9)).toFixed(3), symbol: t.symbol, logoUrl: t.logoUrl
    }
    });
    return result;
}


export const get24HourPercentageChange =  async (address:string | undefined) => {

    const TokenPrice = Moralis.Object.extend("Token1Day")
    const query = new Moralis.Query(TokenPrice);

    query.select("createdAt","timeStamp","exchange", "symbol", "pctChange");

    query.equalTo("address", address);
    query.descending("timeStamp");
    query.limit(5000);
    const result = await query.find();
    console.log("Result has timestamp: ", result[0]?.get("timeStamp"));
    return result[0]?.get("pctChange").toFixed(2);

}