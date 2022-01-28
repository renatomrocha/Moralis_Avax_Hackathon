import {CorrelationChart} from "./correlationChart/CorrelationChart";
import React, {useEffect, useState} from "react";
import {getCorrelations} from "../../services/tokenService";
import {ColorPalette} from "../styles/color_palette";
import {Checkbox, HStack} from "@chakra-ui/react";


const CorrelationChartWrapper = (props: any) => {

    const {tokenList} = props;

    const [data, setData] = useState([]);



    const [activeTokens, setActiveTokens] = useState<any>(["WBTC.e", "WETH.e", "WAVAX.e", "LINK.e", "TIME", "JOE", "AAVE.e"]);


    useEffect(() => {
        getCorrelations(activeTokens)
            .then((d: any) => {
                console.log("Correlation data");
                console.log(d);
                setData(d);
            })
    }, [])

    const handleCheckBoxChange = (e: any, idx: number) => {
        const toAdd = e.target.checked;
        if (toAdd) {
            activeTokens.push(tokenList[idx].symbol);
            getCorrelations(activeTokens)
                .then((d: any) => {
                    console.log("Correlation data");
                    console.log(d);
                    setData(d);
                })
            // setIsLoading(true);
            // fetchPctChanges();
        } else {
            const idxToRemove = activeTokens.indexOf(tokenList[idx].symbol);
            activeTokens.splice(idxToRemove, 1);
            // const currentPrices = tokenPrices;
            // setTokenPrices(currentPrices.filter((tp) => tp.symbol != tokenList[idx].symbol));
            getCorrelations(activeTokens)
                .then((d: any) => {
                    console.log("Correlation data");
                    console.log(d);
                    setData(d);
                })

            // tokenPrices;
        }
    }


    const checkActiveTokens = (t: any) => {
        return activeTokens.includes(t.symbol)
    }


    return (<>{data.length && <div style={{width:'100%', display:'flex'}}>
        <HStack spacing='110px' style={{height: '100%'}}>
<div style={{marginRight:160}}>
        <div style={{fontSize: '1.4em'}}>Tokens</div>
        <div style={{
            height: 500,

            overflowY: 'scroll',
            width: 250,
            borderColor: ColorPalette.thirdColor,
            borderWidth: 1,
            borderRadius: 20,
            padding: 20
        }}>

            <ul style={{listStyleType: 'none'}}>
                {tokenList.map((t: any, idx: number) => <li style={{marginBottom: 5}}>
                    <Checkbox size='lg' iconColor='red'
                              style={{margin: 15}}
                              colorScheme='red'
                              defaultChecked={checkActiveTokens(t)}
                              onChange={(e) => handleCheckBoxChange(e, idx)}>
                        <HStack style={{marginLeft:20}}>
                            <img width={30} src={t.logoUrl}/>
                            <div>{t.symbol}</div>
                        </HStack>
                    </Checkbox></li>)}
            </ul>
            {/*<Checkbox style={{margin: 5}} defaultChecked={false}*/}
            {/*          onChange={(e) => handleSelectAll(e)}>Select All</Checkbox>*/}


        </div>
</div>

            <CorrelationChart corrData={data}/>
        </HStack>

    </div>}
    </>)

}

export default CorrelationChartWrapper;