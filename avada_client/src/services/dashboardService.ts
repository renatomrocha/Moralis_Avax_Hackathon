import {getTokenPrice} from "./tokenService";
import Moralis from "moralis";


export const getTopGainers = async () => {
    const TokenPrice = Moralis.Object.extend("Token1Day")
    const query = new Moralis.Query(TokenPrice);
    query.select("pctChange", "id", "timeStamp","exchange", "symbol");
    const currentDate = new Date();
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() -2, 22, 0,0,0).getTime() / 1000;
    // console.log("Checking prices greater than ",date);
    query.greaterThanOrEqualTo("timeStamp", date);
    query.descending("pctChange");
    const results = await query.find();
    const gainers = results.map((r)=>{
        return {pctChange: r.get("pctChange"), symbol: r.get("symbol")}
    })

    return gainers.slice(0,5);
}


export const getTopLosers = async () => {
    const TokenPrice = Moralis.Object.extend("Token1Day")
    const query = new Moralis.Query(TokenPrice);
    query.select("pctChange", "id", "timeStamp","exchange", "symbol");
    const currentDate = new Date();
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() -2, 22, 0,0,0).getTime() / 1000;
    // console.log("Checking prices greater than ",date);
    query.greaterThanOrEqualTo("timeStamp", date);
    query.ascending("pctChange");
    const results = await query.find();
    const gainers = results.map((r)=>{
        return {pctChange: r.get("pctChange"), symbol: r.get("symbol")}
    })

    return gainers.slice(0,5);
}


export const getTopMCap = async () => {
    const TokenPrice = Moralis.Object.extend("Token1Day")
    const query = new Moralis.Query(TokenPrice);

    query.select("marketCap", "id", "timeStamp","exchange", "symbol");
    const currentDate = new Date();
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() -2, 22, 0,0,0).getTime() / 1000;
    // console.log("Checking prices greater than ",date);
    query.greaterThanOrEqualTo("timeStamp", date);
    query.descending("marketCap");
    const results = await query.find();
    const gainers = results.map((r)=>{
        return {marketCap: r.get("marketCap"), symbol: r.get("symbol")}
    })
    const top5 = gainers.slice(0,5);
    return top5.map((t:any)=> {
        return{'marketCap':(t.marketCap/(10**9)).toFixed(3), symbol: t.symbol
    }
    });
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