import Moralis from "moralis";


export const getDexList = async () : Promise<any[]> => {

        const DEX = Moralis.Object.extend("Dex")
        const query = new Moralis.Query(DEX);
        // query.equalTo("name","0x")
        query.select("name", "id");
        const results = await query.find();
        const dexList = results.map((r)=>{
            const dex = r;
            return {label:r.get("name"),address: r.get("address"),erc20: r.get("erc20address")}
        });
        console.log("Got results: ", dexList);

        // console.log("Name is: ", dexes[0].get("name"))
        return dexList;
    }
