import List from "../genericComponents/List";
import {ColorPalette} from "../styles/color_palette";
import {getTopGainers} from "../../services/dashboardService";


export function Gainers(props:any) {
// ,borderWidth:1, borderStyle:'solid',borderColor:'grey', borderRadius:20
    return(<div style={{width:400, height:400, margin:20}}>
        <div style={{width:'100%', backgroundColor:ColorPalette.secondaryColor}}>
        {/*<h3 style={{margin:10}}>Gainers</h3>*/}
        </div>
            <List title="Gainers" getter={getTopGainers} entityProps={[{name:"Symbol",value:"symbol"},{name:"% Change", value: "pctChange", postProcess:(a:any)=>(a*100).toFixed(2)+'%'}]}/>


    </div>)

}