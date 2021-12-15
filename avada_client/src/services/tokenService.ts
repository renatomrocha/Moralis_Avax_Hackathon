import Moralis from "moralis";

export const getTokenList = async () : Promise<any[]> => {

    const TOKEN = Moralis.Object.extend("Token")
    const query = new Moralis.Query(TOKEN);
    // query.equalTo("name","0x")
    query.select("name", "id");
    const results = await query.find();
    const tokenList = results.map((r)=>{
        return {label:r.get("name"),address: r.get("symbol")}
    });
    console.log("Got results: ", tokenList);
    return tokenList;
}


