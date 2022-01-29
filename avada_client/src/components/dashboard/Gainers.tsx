import List from "../genericComponents/List";
import {ColorPalette} from "../styles/color_palette";
import {getTopGainers} from "../../services/dashboardService";


export function Gainers(props:any) {
// ,borderWidth:1, borderStyle:'solid',borderColor:'grey', borderRadius:20
    return(<div style={{...props.style}}>
        <div style={{width:'100%', backgroundColor:ColorPalette.secondaryColor}}>
        {/*<h3 style={{margin:10}}>Gainers</h3>*/}
        </div>
            <List title="Gainers" getter={getTopGainers} entityProps={[{name:"", value:'logoUrl', type:'img'},{name:"Symbol",value:"symbol"},{name:"% Change (24h)", value: "pctChange", postProcess:(a:any)=>(a*100).toFixed(2)+'%'}]}/>


    </div>)

}