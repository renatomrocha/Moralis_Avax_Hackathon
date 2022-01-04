import React, {useEffect, useState} from 'react';
import {background, Table, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import Title from "./genericComponents/Title";
import {getPoolList} from "../services/dexService";

function Pools()  {

    const [poolList, setPoolList] = useState<any>(0)

    useEffect (()=> {
        getPoolList()
            .then((pools)=>{
                console.log("Pools: ", pools);
                setPoolList(pools)
            });
    },[])


    return (
        <div>
            <Title title="Pools"/>
            {poolList.length>0 &&
            <PoolList poolList={poolList}/>
            }
        </div>
    );
}


function PoolList(props: any) {


    const navigate = useNavigate();

    const [selected, setSelected] = useState<number | null>(null);

    const handleHover = (e: any, idx: number) => {
        setSelected(idx);
    }


    return(<Table variant='simple'>
        <Thead>
            <Tr>
                <Th>Name</Th>
                <Th>Token0</Th>
                <Th>Token1</Th>
                <Th>Exchange</Th>
                <Th>Volume (24h)</Th>

            </Tr>
        </Thead>
        <Tbody>
            {props.poolList.map((pool: any, idx: number)=> {
                return(<Tr key={idx} style={selected==idx?{backgroundColor:'#FFB6C1', borderRadius:"10px", cursor:'pointer'}:{}} onMouseEnter={(e)=> handleHover(e, idx)}
                           onClick={()=>navigate(`/pool/${pool.token0}/${pool.token1}`)}>
                    <Td>{pool.name}</Td>
                    <Td>{pool.token0}</Td>
                    <Td>{pool.token1}</Td>
                    <Td>{pool.exchange}</Td>
                    <Td>Volume</Td>
                </Tr>)
            })}
        </Tbody>

    </Table>)
}




export default Pools;