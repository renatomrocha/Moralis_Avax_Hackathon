import React, {ReactNode, useEffect, useState} from 'react';
import {getTokenList, getTokenLogoUrl, getTokenLogoUrls, getTokenPrice} from "../services/tokenService";
import {
    background, Box, DrawerBody,
    DrawerCloseButton,
    DrawerContent, DrawerHeader,
    DrawerOverlay,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr, useDisclosure
} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import Title from "./genericComponents/Title";
import {ColorPalette} from "./styles/color_palette";

function Drawer(props: { isFullHeight: boolean, placement: string, onClose: any, isOpen: any, children: ReactNode }) {
    return null;
}

function Tokens()  {

    const [tokenList, setTokenList] = useState<any>(0)

    useEffect (()=> {
        getTokenList()
            .then((tokens)=>{
                console.log("Tokens: ", tokens);
                setTokenList(tokens)

                // getTokenLogoUrls()
                //     .then((urls)=>{
                //         urls.map((url)=>{
                //             const idx = tokens.indexOf("address", url.address)
                //         })
                //
                //
                //
                //     })
            });
    },[])


    return (
        <div >
            <Title title="Tokens"/>
            {tokenList.length>0 &&
                <TokenList tokenList={tokenList}/>}
        </div>

    );
}


function TokenList(props: any) {


    const navigate = useNavigate();

    const [selected, setSelected] = useState<number | null>(null);

    const handleHover = (e: any, idx: number) => {
        setSelected(idx);
    }

    const handleLeave = () => {
        setSelected(null);
    }


    return(<Table variant='simple'>
        <Thead>
            <Tr>
                <Th>Name</Th>
                <Th>Symbol</Th>
                <Th>Current Price</Th>
                <Th>Market Cap</Th>
            </Tr>
        </Thead>
            <Tbody style={{overflow:"auto"}}>
                {props.tokenList.map((token: any, idx: number)=> {
                    return(<Tr key={idx} style={selected==idx?{backgroundColor:ColorPalette.highlight, borderRadius:10, cursor:'pointer'}:{}}
                               onMouseEnter={(e)=> handleHover(e, idx)}
                               onMouseLeave={()=>handleLeave()}
                               onClick={()=>navigate(`/token/${token.address}`)}>
                        <Td></Td>
                        <Td>{token.symbol}</Td>
                        <Td>{token.address}</Td>
                        <Td>MCap</Td>
                    </Tr>)
                })}
            </Tbody>

    </Table>)
}




export default Tokens;