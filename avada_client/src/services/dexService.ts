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
    query.select("dexName", "symbol0","symbol1");
    const results = await query.find();
    const poolList = results.map((r)=>{
        // const dex = r;
        return {name:r.get("dexName"),token0: r.get("symbol0"),token1: r.get("symbol1")}
    });
    console.log("Got results: ", poolList);

    // console.log("Name is: ", dexes[0].get("name"))
    return poolList;

}


