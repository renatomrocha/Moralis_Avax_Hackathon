import React, {useEffect, useState} from 'react';
import Moralis from "moralis";


function ExampleChart()  {

    const [price, setPrice] = useState<any>(0)

    useEffect(()=> {
        getPrice();
        },[])

    const getPrice = async () => {
        const options : any = {
            address: "0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB",
            chain: "avalanche",
        };

        const ethToken = await Moralis.Web3API.token.getTokenPrice(options);
        console.log(ethToken);
        setPrice(ethToken.usdPrice);
    }



    return (
       <div>
           <span>Current price for ethereum is: {price}</span>
       </div>
);

}


export default ExampleChart;