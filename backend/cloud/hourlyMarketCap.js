
Moralis.Cloud.job('computeMarketCap', async(request) => {


    // Fetch details (address and abi)
    // Abi to get total Supply
    const ABI = Moralis.Object.extend("TokenDetails");
    const query = new Moralis.Query(ABI);
    query.select("address", "abi","decimals");
    const results = await query.find();
    const tokenList = results.map(async (r) => {
        logger.info(`Computing abi`);
        try{
            const strAbi = JSON.parse(r.get("abi").toString().replaceAll("'",'"').replaceAll("False",'"False"').replaceAll("True",'"True"'))
                const token = {
                    address: r.get("address"),
                    abi: strAbi,
                    decimals: r.get("decimals")
                };

                const options = {
                    chain: "avalanche",
                    address: token.address,
                    function_name: "totalSupply",
                    abi: token.abi
                };

                logger.info(`Address is: ${options.address}`);
                const totalSupply = await Moralis.Web3API.native.runContractFunction(options);

                try{
                    const tokenPrice = await Moralis.Web3API.token.getTokenPrice({chain: "avalanche",
                        address: token.address});

                    const supply = (parseInt(totalSupply));
                    const marketCap = (supply / 10**token.decimals) * tokenPrice.usdPrice;

                    const TokenSupplyObject = Moralis.Object.extend("MarketCaps");


                    const tokenSupply = new TokenSupplyObject();
                    tokenSupply.set("supply", supply);
                    tokenSupply.set("date", new Date());
                    tokenSupply.set("tokenAddress", token.address);
                    tokenSupply.set("marketCap", marketCap);

                    tokenSupply.save()
                        .then(()=> {
                            logger.info(`SUCCESS -------> Total supply for ${token.address}= ${totalSupply}`);
                        })
                        .catch((e)=> {
                            logger.info(`Error storing supply for tokrn ${token.address}`);
                            logger.error(`${e}`);
                        })
                } catch (e) {
                    logger.info(`Error fetching totalSupply`);
                    logger.error(`${e}`);
                }
        } catch (e) {
            // logger.info(`Error computing strAbi`);
            logger.info(`${e}`);
        }
    });


    tokenList.map(async (token)=> {


    });
});

