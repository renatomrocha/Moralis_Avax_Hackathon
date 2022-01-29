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
import AvadaSpinner from "./genericComponents/AvadaSpinner";
import  { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare, faSort } from '@fortawesome/free-solid-svg-icons'
import {sort} from "../utils/generalUtil";
// import fontawesome from '@fortawesome/fontawesome'

// fontawesome.library.add(faSort as any);

function Drawer(props: { isFullHeight: boolean, placement: string, onClose: any, isOpen: any, children: ReactNode }) {
    return null;
}

function Tokens(props:any)  {

    const [tokenList, setTokenList] = useState<any[]>([])
    const [isAscending, setIsAscending] = useState(false);

    useEffect (()=> {
        getTokenList()
            .then((tokens)=>{
                const filteredTokens = tokens.filter((t:any)=>t.symbol!='ANY' && t.symbol!='SUSHI.e');
                setTokenList(filteredTokens);

            });
    },[])



    const sortTokens = (prop : string) => {
        setTokenList(sort(tokenList, prop, isAscending));
        setIsAscending(!isAscending);
    }


    return (
        <div style={{...props.style}}>
            <Title title="Tokens" hasInfo/>
            {tokenList.length>0 &&
                <TokenList tokenList={tokenList} sort={sortTokens}/>}
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

    const renderTokenPrice = (token : any) => {
        if(token.price > -1) {
            return (<span>{'$ ' + token.price}</span>)
        } else {
            return(<span>-</span>)
        }
    }

    const renderMarketCap = (token:any) => {
        if(token.marketCap > -1) {
            return (<span>{'M$ ' + (token.marketCap / 10**6).toFixed(2)}</span>)
        } else {
            return(<span>-</span>)
        }
    }

    return(<Table variant='simple'>
        <Thead>
            <Tr>
                <Th>Name</Th>
                <Th>Symbol <FontAwesomeIcon icon={faSort} onClick={()=>props.sort('symbol')}/></Th>
                <Th>Current Price <FontAwesomeIcon icon={faSort} onClick={()=>props.sort('price')}/></Th>
                <Th>Market Cap <FontAwesomeIcon icon={faSort} onClick={()=>props.sort('marketCap')}/></Th>
                <Th>% change (24h) <FontAwesomeIcon icon={faSort} onClick={()=>props.sort('pctChange')}/></Th>

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
                        <Td>{renderTokenPrice(token)}</Td>
                        <Td>{renderMarketCap(token)}</Td>
                        <Td style={{color: token.pctChange>0?ColorPalette.fontGreen:ColorPalette.red}}>
                                    {token.pctChange + '%'}
                            </Td>
                    </Tr>)
                })}
            </Tbody>

    </Table>)
}




export default Tokens;