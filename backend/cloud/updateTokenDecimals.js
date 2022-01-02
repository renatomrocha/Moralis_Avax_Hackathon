
Moralis.Cloud.job("updateTokenDecimals", async (request) => {

    const TOKEN = Moralis.Object.extend("TokenDetails");
    const query = new Moralis.Query(TOKEN);
    query.select("symbol", "address", "chain");
    const results = await query.find();
    results.map(async (r)=> {
        const priceOptions  = {
            addresses: `${r.get("address")}`,
            chain: "avalanche"
        };

        logger.info(`Token address is: ${priceOptions.addresses}`);
        const metadata = await Moralis.Web3API.token.getTokenMetadata(priceOptions);
        logger.info(`Decimals for token ${priceOptions.addresses} is ${metadata[0].decimals}`)
        r.set("decimals", parseInt(metadata[0].decimals));
        r.save().then(()=> logger.info(`Saved successfully`)).catch((e)=>{
            logger.info(`Error saving...`);
            logger.info(`${e}`);
        })
    })

    // const tokenList = results.map((r) => {
    //     return {
    //         address: r.get("address"),
    //         symbol: r.get("symbol")
    //     };
    // });
    //
    //
    //
    // for (let i = 0; i < tokenList.length; i++) {
    //
    //     const token = tokenList[i];
    //
    //     try{
    //
    //         const priceOptions  = {
    //             addresses: `${token.address}`,
    //             chain: "avalanche"
    //         };
    //
    //         logger.info(`Token address is: ${token.address}`);
    //         const metadata = await Moralis.Web3API.token.getTokenMetadata(priceOptions);
    //         logger.info(`Metadata is: ${metadata[0]}`);
    //         const query = new Moralis.Query(TOKEN);
    //         query.equalTo("address", token.address);
    //         const queryResult = await query.first();
    //         query.select("address", "id", "symbol");
    //
    //         logger.info(`Query result: ${queryResult}`);
    //         logger.info(`Token details are ${metadata[0].decimals}`)
    //         queryResult.set("decimals", parseInt(metadata[0].decimals));
    //         queryResult.save().then(()=> {
    //             logger.info(`Saved object`);
    //         }).catch((e)=>{
    //             logger.info(`Something went wrong while saving`);
    //             logger.info(`${e}`);
    //         })
    //
    //     } catch (e) {
    //         logger.info(`Error updating token detail`)
    //         logger.info(`${e}`);
    //     }
    // }
})

