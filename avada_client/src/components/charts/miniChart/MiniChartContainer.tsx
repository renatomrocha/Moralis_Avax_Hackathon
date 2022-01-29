import MiniChart from "./MiniChart";
import {useEffect, useState} from "react";
import {getToken, getTokenByAddress, getTokenPriceHistoryDB} from "../../../services/tokenService";
import {Box, HStack} from "@chakra-ui/react";
import AvadaSpinner from "../../genericComponents/AvadaSpinner";
import {ColorPalette} from "../../styles/color_palette";
import {useNavigate} from "react-router-dom";
import {get24HourPercentageChange} from "../../../services/dashboardService";


export default function     MiniChartContainer ({address, width, height}:any) {

    const navigate = useNavigate();


    const [data, setData] = useState<any>(null);

    const [tokenInfo, setTokenInfo] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [borderColor, setBorderColor] = useState('gray.200')

    const [pctChange, setPctChange] = useState(0);

    const [currentPrice, setCurrentPrice] = useState(0);

    const [plotColor, setPlotColor] = useState("");

    useEffect(()=>{
        setIsLoading(true);


        getTokenByAddress(address)
            .then((t:any)=>setTokenInfo(t));

        getTokenPriceHistoryDB(address, "Token1Hour", 1)
            .then((d)=> {
                setData(d.slice(d.length -24, d.length -1));
                setIsLoading(false);
            })

    },[])


    useEffect(()=>{
        if(data) {
            getToken(address)
                .then((t: any)=>{
                    console.log("T is: ", t);
                    setPctChange(t.pctChange);
                    setCurrentPrice(t.price);
                })
        }
    },[data])

    useEffect(()=>{
        console.log("Pctgchange is: ", pctChange);
        console.log("Setting color: ", pctChange>0?ColorPalette.green:ColorPalette.red);
        setPlotColor(pctChange>0?ColorPalette.green:ColorPalette.red)


    },[pctChange])



    return (<div onMouseEnter={()=>setBorderColor(pctChange > 0 ? ColorPalette.green : ColorPalette.red)} onMouseLeave={()=>setBorderColor('gray.200')}>

            {isLoading && (<Box border="1px" borderColor={borderColor}  borderRadius={30} padding={5} >
                <AvadaSpinner/>
            </Box>)}

        {(data && plotColor) && (
            <Box border="2px" borderColor={borderColor} borderRadius={30} padding={5} onClick={()=>navigate(`/token/${address}`)}>
                {tokenInfo && (<><HStack>
                        <img style={{width:30, height:30}} src={tokenInfo.logoUrl}/>
                        <span>{tokenInfo.symbol}</span>
                        {pctChange!==0 && (<span style={{marginRight: 30, color: (pctChange < 0)? ColorPalette.red: ColorPalette.green}}>{pctChange + '% (24h)'}</span>)}
                    </HStack>
                        { <span style={{margin:40}}>{'$ ' + currentPrice}</span>}

                    </>
                )}
                {(data.length >0 && pctChange) && <div style={{width:width, height:height}}><MiniChart data={data}  width={width} height={height} color={pctChange > 0 ? ColorPalette.green : ColorPalette.red}/></div>}


            </Box>
        )}
        </div>
    )

}