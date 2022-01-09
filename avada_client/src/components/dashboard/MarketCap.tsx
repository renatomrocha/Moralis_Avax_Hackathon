import List from "../genericComponents/List";
import {ColorPalette} from "../styles/color_palette";
import {getTopMCap} from "../../services/dashboardService";



export function MarketCap(props:any) {


    return(<div style={{width:800, height:400, margin:20}}>
        <div style={{width:'100%', backgroundColor:ColorPalette.secondaryColor}}>
            {/*<h3 style={{margin:10}}>Gainers</h3>*/}
        </div>
        <List title="Market Cap" getter={getTopMCap} noHead={true} entityProps={[{name:"Symbol",value:"symbol"},{name:"M Cap", value: "marketCap"}]}/>


    </div>)

}