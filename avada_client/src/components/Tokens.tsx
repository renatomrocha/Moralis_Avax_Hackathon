import React, {useEffect, useState} from 'react';
import Moralis from "moralis";
import {getTokenList, getTokenPrice} from "../services/tokenService";
import {Table, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";


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
            <h1>Tokens</h1>
            {tokenList.length>0 &&
                <TokenList tokenList={tokenList}/>
            }
        </div>
    );
}


function TokenList(props: any) {

    const navigate = useNavigate();


    useEffect(()=>{
        getTokenPrice("0x5947bb275c521040051d82396192181b413227a3", "avalanche")
            .then(t=>console.log("Token price is: ", t))
    },[])

    const handleMouseEnter = (idx:number) => {

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
                    return(<Tr onClick={()=>navigate(`/tokens/${token.address}`)}>
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