import {ColorPalette} from "../styles/color_palette";
import List from "../genericComponents/List";
import {getTopGainers, getTopLosers} from "../../services/dashboardService";

export function Losers(props:any) {

    return(<div style={{width:400, height:400, margin:20,borderWidth:1, borderStyle:'solid',borderColor:'grey', borderRadius:20}}>
    <div style={{width:'100%', backgroundColor:ColorPalette.secondaryColor}}>
    {/*<h3 style={{margin:10}}>Gainers</h3>*/}
    </div>
    <List title="Losers" getter={getTopLosers} entityProps={[{name:"Symbol",value:"symbol"},{name:"% Change", value: "pctChange", postProcess:(a:any)=>(a*100).toFixed(2)+'%'}]}/>


    </div>)

}