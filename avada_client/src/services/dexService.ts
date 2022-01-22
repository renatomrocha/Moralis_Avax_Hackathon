import Moralis from "moralis";


export const getDexList = async () : Promise<any[]> => {

        const DEX = Moralis.Object.extend("Dex")
        const query = new Moralis.Query(DEX);
        query.select("name", "id");
        const results = await query.find();
        const dexList = results.map((r)=>{
            // const dex = r;
            return {label:r.get("name"),address: r.get("address"),erc20: r.get("erc20address")}
        });
        console.log("Got results: ", dexList);

        // console.log("Name is: ", dexes[0].get("name"))
        return dexList;
    }


export const getPoolList = async () : Promise<any[]> => {
    const POOL = Moralis.Object.extend("DexTokenPairControl")
    const query = new Moralis.Query(POOL);
    query.select("dexName", "symbol0","symbol1","pairAddress");
    const results = await query.find();
    const poolList = results.map((r)=>{
        // const dex = r;
        return {name:r.get("dexName"),token0: r.get("symbol0"),token1: r.get("symbol1"), pairAddress: r.get('pairAddress')}
    });
    console.log("Got results: ", poolList);

    // console.log("Name is: ", dexes[0].get("name"))
    return poolList;

}


export const getInfoForPools = async (date?: any) => {

    const PoolInfo = Moralis.Object.extend("DexTokenPairLiquidity");
    const query = new Moralis.Query(PoolInfo);
    query.select("dexName", "symbol0","symbol1","reserve0","reserve1","tvl0","tvl1","timeStamp");
    if(date) {
        query.greaterThan("timeStamp", date);
    }
    query.limit(5000);
    query.ascending("timeStamp");
    const results = await query.find();
    const processedData = [];
    const poolInfo = results.map((r:any)=>{
        return {dexName: r.get("dexName"), symbol0: r.get("symbol0"), symbol1: r.get("symbol1"), reserve0: r.get("reserve0"), reserve1: r.get("reserve1"), tvl0: r.get("tvl0"), tvl1: r.get("tvl1")}
    })

    return poolInfo;
}


export const getInfoForPoolsForPair = async (address?: any, date?: any) => {

    const PoolInfo = Moralis.Object.extend("DexTokenPairLiquidity");
    const query = new Moralis.Query(PoolInfo);
    query.select("dexName", "symbol0","symbol1","reserve0","reserve1","tvl0","tvl1","timeStamp");
    if(date) {
        query.greaterThan("timeStamp", date);
    }
    query.limit(5000);
    query.equalTo("pairAddress", address);
    query.ascending("timeStamp");
    const results = await query.find();
    const poolInfo = results.map((r:any)=>{
        return {dexName: r.get("dexName"), symbol0: r.get("symbol0"), symbol1: r.get("symbol1"),
            reserve0: Math.round(r.get("reserve0")), reserve1: Math.round(r.get("reserve1")), tvl0: Math.round(r.get("tvl0")), tvl1: Math.round(r.get("tvl1")), timestamp: r.get("timeStamp")}
    })

    return poolInfo;
}

