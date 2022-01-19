import {SpinnerCircularSplit} from "spinners-react";
import React from "react";
import {ColorPalette} from "../styles/color_palette";


const NFTicketSpinner = (props:any) => {

    return(
        <div  style={{...props.style, justifyItems:'center'}}>
            <SpinnerCircularSplit size={props.spinnerSize?props.spinnerSize:"60"} color={ColorPalette.secondaryColor}/>
            <span style={{color:ColorPalette.secondaryColor,  marginLeft:"20px"}}>{props.message}</span>
        </div>
    )


}

export default NFTicketSpinner;