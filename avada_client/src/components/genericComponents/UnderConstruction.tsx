import React, {useEffect, useState} from "react";
import {HStack} from "@chakra-ui/react";

const UnderConstruction = ({icon,name} : any) => {

    return (
        <div style={{fontSize:40}}>
            <div style={{ position: 'absolute' ,left: '50%', top: '40%',   transform: 'translate(-50%, -50%)'}}>
                <HStack spacing={'24px'}>
                    <div style={{marginBottom: 50}}>
                        <img style={{width:120, height:120}} src={icon}/>
                    </div>
                        <div style={{fontSize: 80}}>{name}</div>
                </HStack>
                <h1>Work in progress...</h1>
            </div>
        </div>
    )

}

export default UnderConstruction;