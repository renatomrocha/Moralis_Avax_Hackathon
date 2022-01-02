import React, {useEffect, useState} from 'react';
import {getTokenList, getTokenPrice} from "../services/tokenService";
import {background, Table, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import Title from "./genericComponents/Title";

function Tokens()  {

    const [tokenList, setTokenList] = useState<any>(0)

    useEffect (()=> {
        getTokenList()
            .then((tokens)=>{
                console.log("Tokens: ", tokens);
                setTokenList(tokens)
            });
    },[])


    return (
        <div>
            <Title title="Tokens"/>
            {tokenList.length>0 &&
                <TokenList tokenList={tokenList}/>
            }
        </div>
    );
}


function TokenList(props: any) {


    const navigate = useNavigate();

    const [selected, setSelected] = useState<number | null>(null);

    const handleHover = (e: any, idx: number) => {
        setSelected(idx);
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
                    return(<Tr key={idx} style={selected==idx?{backgroundColor:'#FFB6C1', borderRadius:"10px", cursor:'pointer'}:{}} onMouseEnter={(e)=> handleHover(e, idx)} onClick={()=>navigate(`/token/${token.address}`)}>
                        <Td>{token.name}</Td>
                        <Td>{token.symbol}</Td>
                        <Td>{token.address}</Td>
                        <Td>MCap</Td>
                    </Tr>)
                })}
            </Tbody>

    </Table>)
}




export default Tokens;