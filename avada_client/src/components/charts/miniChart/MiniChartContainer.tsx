import MiniChart from "./MiniChart";
import {useEffect, useState} from "react";
import {getTokenByAddress, getTokenPriceHistoryDB} from "../../../services/tokenService";
import {Box, HStack} from "@chakra-ui/react";


export default function     MiniChartContainer ({address, width, height}:any) {
    const [data, setData] = useState<any>(null);

    const [tokenInfo, setTokenInfo] = useState<any>(null);

    useEffect(()=>{
        getTokenByAddress(address)
            .then((t:any)=>setTokenInfo(t));

        getTokenPriceHistoryDB(address, "Token1Hour", 1)
            .then((d)=> {
                setData(d);
                console.log("Received: ", data);
            })

    },[])

    const getPercentage = () => {
        return parseFloat((data[data.length-1].pctChange * 100).toFixed(2));
    }

    return (<>
        {data && (
            <Box border="1px" borderColor={"gray.200"} borderRadius={30} padding={5}>
                {tokenInfo && (<><HStack>
                        <img style={{width:30, height:30}} src={tokenInfo.logoUrl}/>
                        <span>{tokenInfo.symbol}</span>
                        <span style={{marginRight: 30, color: (getPercentage() < 0)? 'red': 'green'}}>{getPercentage() + '%'}</span>
                    </HStack>
                    <span style={{margin:40}}>{data[data.length-1].price.toFixed(2) + '$'}</span>
                    </>
                )}
                <MiniChart data={data}  width={width} height={height}/>
            </Box>
        )}
        </>
    )

}