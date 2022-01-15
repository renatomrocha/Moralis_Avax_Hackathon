import MiniChart from "./MiniChart";
import {useEffect, useState} from "react";
import {getTokenByAddress, getTokenPriceHistoryDB} from "../../../services/tokenService";
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

    const [plotColor, setPlotColor] = useState("");

    useEffect(()=>{
        setIsLoading(true);
        get24HourPercentageChange(address)
            .then((pct)=> {
                setPctChange(pct)
                setPlotColor(pct>0?ColorPalette.green:ColorPalette.red)
            });


        getTokenByAddress(address)
            .then((t:any)=>setTokenInfo(t));

        getTokenPriceHistoryDB(address, "Token1Hour", 1)
            .then((d)=> {
                setData(d.slice(d.length -24, d.length -1));
                setIsLoading(false);
            })

    },[])

    const getPercentage = () => {

        // Change this to be last 24 hour percentage
        return parseFloat((pctChange * 100).toFixed(2));
    }

    return (<div onMouseEnter={()=>setBorderColor(pctChange > 0 ? ColorPalette.green : ColorPalette.red)} onMouseLeave={()=>setBorderColor('gray.200')}>

            {isLoading && (<Box border="1px" borderColor={borderColor} borderRadius={30} padding={5} >
                <AvadaSpinner/>
            </Box>)}

        {(data && plotColor) && (
            <Box border="2px" borderColor={borderColor} borderRadius={30} padding={5} onClick={()=>navigate(`/token/${address}`)}>
                {tokenInfo && (<><HStack>
                        <img style={{width:30, height:30}} src={tokenInfo.logoUrl}/>
                        <span>{tokenInfo.symbol}</span>
                        {pctChange!==0 && (<span style={{marginRight: 30, color: (getPercentage() < 0)? ColorPalette.red: ColorPalette.green}}>{getPercentage() + '% (24h)'}</span>)}
                    </HStack>
                        {data[data.length-1] && <span style={{margin:40}}>{'$ ' + data[data.length-1].price.toFixed(2)}</span>}

                    </>
                )}
                {data.length >0 && <MiniChart data={data}  width={width} height={height} color={plotColor}/>}


            </Box>
        )}
        </div>
    )

}