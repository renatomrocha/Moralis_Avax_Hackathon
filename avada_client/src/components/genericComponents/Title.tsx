
import {HStack, Text} from '@chakra-ui/react';
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {useState} from "react";
import {ColorPalette} from "../styles/color_palette";

export default function Title(props: any) {

    const [popupActivated, setPopupActivated] = useState(false);

    const [popupCoords, setPopupCoords] = useState([0,0]);

    const handleInfoHover = (e:any) => {
        console.log("Event: ", e.target);
        console.log("Boundingrect: ", e.target.getBoundingClientRect())
        const rect = e.target.getBoundingClientRect()
        setPopupCoords([rect.x, rect.y])
        console.log("Activating popup");
        setPopupActivated(true);
    }

    const handleInfoOut = () => {
        setPopupActivated(false);

    }


    return(<HStack style={{margin:20, zIndex:999}}>
        <Text fontSize='2xl'>{props.title}</Text>
        {props.extraInfo && <div onMouseEnter={handleInfoHover} onMouseLeave={handleInfoOut} style={{padding:10, zIndex:999}}><FontAwesomeIcon  icon={faInfoCircle}  style={{float:'right',color:ColorPalette.mainColor}}/></div>}
        {popupActivated && (<div style={{color:'white', position:'absolute', left: popupCoords[0] + 20,top: popupCoords[1] + 20, float:'left',backgroundColor:ColorPalette.mainColor, opacity:0.95, zIndex:999,borderColor:'gray', borderWidth:1,
            borderRadius:10, width:200,  padding:20}}>{props.extraInfo}</div>)}
    </HStack>)
}