import React, {useEffect, useState} from 'react';
import {getTokenList, getTokenPrice} from "../../services/tokenService";
import {background, Table, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import Title from "./Title";
import {ColorPalette} from "../styles/color_palette";

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
            {props.title && (<Title title={props.title}/>)}
            {entityList.length>0 &&
            <EntityList tableStyle={props.tableStyle} entityList={entityList} entityProps={props.entityProps} noHead={props.noHead}/>
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


    return(<Table style={{...props.tableStyle}} variant='simple'>
        {!props.noHead && (
            <Thead>
                <Tr>
                    {props.entityProps.filter((ep:any)=>!ep.dontDisplay).map((ep:any, idx:number)=> {
                        return(<Th key={idx}>{ep.name}</Th>)
                    })}
                </Tr>
            </Thead>
        )}
        <Tbody>
            {props.entityList.map((entity: any, idx: number)=> {
                return(<Tr key={idx} style={selected==idx?{backgroundColor:ColorPalette.highlight, borderRadius:"10px", cursor:'pointer'}:{}}
                           onMouseEnter={(e)=> handleHover(e, idx)} onMouseLeave={()=> setSelected(null)}
                           onClick={()=>navigate(`/token/${entity.address}`)}>
                    {/*TODO Need to fix ^^^^^ this to be generic*/}


                    {props.entityProps.filter((ep:any)=>!ep.dontDisplay).map((ep:any,i:number)=> {
                        return(<Th key={i}>{ep.type=='img'?<img style={{width:30, height:30}} src={entity[ep.value]}/>:ep.postProcess?ep.postProcess(entity[ep.value]):entity[ep.value]}</Th>)
                    })}
                </Tr>)
            })}
        </Tbody>

    </Table>)
}


export default List;