import React, {useEffect, useState} from 'react';
import {getTokenList, getTokenPrice} from "../../services/tokenService";
import {background, Table, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import Title from "./Title";

function List(props: any)  {

    const [entityList, setEntityList] = useState<any>(0)

    useEffect (()=> {
        props.getter()
            .then((entities : any)=>{
                console.log("Entities: ", entities);
                setEntityList(entities)
            });
    },[])


    return (
        <div>
            <Title title={props.title}/>
            {entityList.length>0 &&
            <EntityList entityList={entityList} entityProps={props.entityProps}/>
            }
        </div>
    );
}


function EntityList(props: any) {


    const navigate = useNavigate();

    const [selected, setSelected] = useState<number | null>(null);

    const handleHover = (e: any, idx: number) => {
        setSelected(idx);
    }


    return(<Table variant='simple'>
        <Thead>
            <Tr>
                {props.entityProps.map((ep:any)=> {
                    return(<Th>{ep.name}</Th>)
                })}
            </Tr>
        </Thead>
        <Tbody>
            {props.entityList.map((entity: any, idx: number)=> {
                return(<Tr key={idx} style={selected==idx?{backgroundColor:'#FFB6C1', borderRadius:"10px", cursor:'pointer'}:{}}
                           onMouseEnter={(e)=> handleHover(e, idx)} >
                    {props.entityProps.map((ep:any,i:number)=> {
                        return(<Th key={i}>{ep.postProcess?ep.postProcess(entity[ep.value]):entity[ep.value]}</Th>)
                    })}
                </Tr>)
            })}
        </Tbody>

    </Table>)
}


export default List;