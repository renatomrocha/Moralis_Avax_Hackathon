import {VStack} from "@chakra-ui/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileDownload} from "@fortawesome/free-solid-svg-icons";
import {ColorPalette} from "../styles/color_palette";
import React from "react";


const ExportIcon = (props: any) => {

    return ( <VStack style={{justifyContent:'center'}}>
        <FontAwesomeIcon icon={faFileDownload} size="lg" style={{float:'right', color:ColorPalette.highlight}}/>
        <span style={{fontSize:'0.6em'}}>Export data</span>
    </VStack>)

}


export default ExportIcon;