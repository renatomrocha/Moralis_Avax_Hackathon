import {ColorPalette} from "../styles/color_palette";
import List from "../genericComponents/List";
import {getTopGainers, getTopLosers} from "../../services/dashboardService";

export function Losers(props:any) {

    return(<div style={{...props.style}}>

    <List title="Losers" getter={getTopLosers} entityProps={[{name:"Symbol",value:"symbol"},{name:"% Change", value: "pctChange", postProcess:(a:any)=>(a*100).toFixed(2)+'%'}]}/>


    </div>)

}