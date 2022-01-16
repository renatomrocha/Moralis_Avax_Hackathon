import React, {ReactNode, useEffect, useState} from 'react';
import {getTokenList, getTokenLogoUrls, getTokenPrice, getTokenPriceFromDB} from "../services/tokenService";
import {
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

function Tokens(props:any)  {

    const [tokenList, setTokenList] = useState<any[]>([])

    useEffect (()=> {
        getTokenList()
            .then((tokens)=>{
                const temporaryList : any[] = [];

                Promise.all(tokens.map(async (token)=>{
                    const price = await getTokenPriceFromDB(token.address);
                    temporaryList.push({...token, price})
                })).then(()=> {
                    setTokenList(temporaryList);

                    console.log("Token list: ", tokenList);
                })



            });
    },[])


    return (
        <div style={{...props.style}}>
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
            <Tbody>
                {props.tokenList.map((token: any, idx: number)=> {
                    return(<Tr key={idx} style={selected==idx?{backgroundColor:ColorPalette.highlight, borderRadius:10, cursor:'pointer'}:{}}
                               onMouseEnter={(e)=> handleHover(e, idx)}
                               onMouseLeave={()=>handleLeave()}
                               onClick={()=>navigate(`/token/${token.address}`)}>
                        <Td><img style={{width:64, height:64}} src={token.logoUrl}/></Td>
                        <Td>{token.symbol}</Td>
                        <Td>{token.price}</Td>
                        <Td>MCap</Td>
                    </Tr>)
                })}
            </Tbody>

    </Table>)
}




export default Tokens;