import List from "../genericComponents/List";
import {ColorPalette} from "../styles/color_palette";
import {getTopMCap} from "../../services/dashboardService";
import {SetStateAction, useEffect, useState} from "react";
import PieChart from "../charts/pieChart/PieChart";
import {Grid, GridItem, HStack} from "@chakra-ui/react";
import Title from "../genericComponents/Title";
import BarRaceChart from "../charts/barRaceChart/BarRaceChart";


export function MarketCap(props: any) {

    const [pieChartData, setPieChartData] = useState<any[]>([]);

    useEffect(() => {

        getTopMCap()
            .then((allTokens) => {
                const percentages: any = [];
                console.log("All tokens: ", allTokens);
                const totalMCap = allTokens.map(i=>parseFloat(i.marketCap)).reduce((a,b : any) => a + b,0)
                console.log("Total marketcap = ", totalMCap);
                allTokens.map((token)=>{
                    percentages.push({"symbol": token.symbol, "percentage":(parseFloat(token.marketCap)/totalMCap*100).toFixed(0)})
                })
                setPieChartData(percentages);
            })
    },[])


    return(<div style={{...props.style}}>
        <Title title="Market Cap (Top 5)"/>

            <HStack spacing={"5%"}>
                {pieChartData.length > 0 && (<PieChart data={pieChartData}/>)}
                <List getter={getTopMCap} tableStyle={{width:350}}  entityProps={[{name:"", value:'logoUrl', type:'img'},{name:"Symbol",value:"symbol"},{name:"M Cap (B$)", value: "marketCap"}]}/>
            </HStack>
    </div>)

}