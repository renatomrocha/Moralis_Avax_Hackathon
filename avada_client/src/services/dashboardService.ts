import {getTokenPrice} from "./tokenService";
import Moralis from "moralis";


export const getTopGainers = async () => {
    const TokenPrice = Moralis.Object.extend("Token1Day")
    const query = new Moralis.Query(TokenPrice);
    query.select("pctChange", "id", "timeStamp","exchange", "symbol");
    const currentDate = new Date();
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() -1, 0, 0,0,0).getTime() / 1000;
    console.log("Checking prices greater than ",date);
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
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() -1, 0, 0,0,0).getTime() / 1000;
    console.log("Checking prices greater than ",date);
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
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() -1, 0, 0,0,0).getTime() / 1000;
    console.log("Checking prices greater than ",date);
    query.greaterThanOrEqualTo("timeStamp", date);
    query.descending("marketCap");
    const results = await query.find();
    const gainers = results.map((r)=>{
        return {marketCap: r.get("marketCap"), symbol: r.get("symbol")}
    })

    return gainers.slice(0,5);
}