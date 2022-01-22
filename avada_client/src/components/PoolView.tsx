import SteamGraph from "./charts/steamChart/SteamGraph";
import React, {useEffect, useState} from "react";
import {getInfoForPools, getInfoForPoolsForPair, getPoolList} from "../services/dexService";
import {Checkbox} from "@chakra-ui/react";
import Title from "./genericComponents/Title";
import SteamGraph2 from "./charts/steamChart/SteamGraph2";
import SteamGraph3 from "./charts/steamChart/SteamGraph3";

const alternative_data = [{timestamp: 1880, tvl0: 241,tvl1:1000, reserve0: 10000000},
    {timestamp: 1881, tvl0: 500,tvl1:10000},
    {timestamp: 1882, tvl0: 2000,tvl1:4500},
    {timestamp: 1883, tvl0: 6000,tvl1:2000},
    {timestamp: 1884, tvl0: 4000,tvl1:3000},
    {timestamp: 1885, tvl0: 8000,tvl1:0},
    {timestamp: 1886, tvl0: 241,tvl1:0},
    {timestamp: 1887, tvl0: 8000,tvl1:0},
    {timestamp: 1888, tvl0: 6000,tvl1:0},
    {timestamp: 1889, tvl0: 241,tvl1:1000},
    {timestamp: 1890, tvl0: 500,tvl1:10000},
    {timestamp: 1891, tvl0: 2000,tvl1:4500},
    {timestamp: 1892, tvl0: 6000,tvl1:2000},
    {timestamp: 1893, tvl0: 4000,tvl1:3000},
    {timestamp: 1894, tvl0: 8000,tvl1:0},
    {timestamp: 1895, tvl0: 241,tvl1:0},
    {timestamp: 1896, tvl0: 8000,tvl1:0},
    {timestamp: 1897, tvl0: 6000,tvl1:0},
    {timestamp: 1898, tvl0: 241,tvl1:1000},
    {timestamp: 1899, tvl0: 500,tvl1:10000},
    {timestamp: 1900, tvl0: 2000,tvl1:4500},
    {timestamp: 1901, tvl0: 6000,tvl1:2000},
    {timestamp: 1902, tvl0: 4000,tvl1:3000},
    {timestamp: 1903, tvl0: 8000,tvl1:0},
    {timestamp: 1904, tvl0: 241,tvl1:0},
    {timestamp: 1905, tvl0: 8000,tvl1:0},
    {timestamp: 1906, tvl0: 6000,tvl1:0},
    {timestamp: 1907, tvl0: 8000,tvl1:0},
    {timestamp: 1908, tvl0: 500,tvl1:10000},
    {timestamp: 1909, tvl0: 8000,tvl1:0},
    {timestamp: 1910, tvl0: 6000,tvl1:0},
    {timestamp: 1911, tvl0: 6000,tvl1:0},
    {timestamp: 1912, tvl0: 8000,tvl1:0},


]






const PoolView = (props:any) => {

    const [data, setData] = useState<any>([]);
    const [poolList, setPoolList] = useState<any[]>([]);
    const [activePool,setActivePool] = useState<any>(null);
    const [graphReady, setGraphReady] = useState<boolean>(false);

    useEffect(()=> {

        getPoolList()
            .then((pools)=>{
                console.log("Pools: ", pools);
                setPoolList(pools)
            });
    }, [])

    const handleCheckBoxChange = (e:any,idx:number) => {
        console.log("CheckBoxChanged");
        setActivePool(poolList[idx]);
    }

    useEffect(()=>{
        if(activePool){
            getInfoForPoolsForPair(activePool.pairAddress)
                .then((d)=>{
                    console.log("Recieved: ", d);
                    const newArr = [];

                    setData(()=>[...d]);
                    console.log("Data now is: ", data);
                })
        }
    },[activePool])




    return (<div>
        <Title title="Pools" hasInfo></Title>

        {poolList.map((t:any, idx: number) => <Checkbox style={{margin:5}} defaultChecked={false} onChange={(e)=>handleCheckBoxChange(e, idx)}>{t.token0}/{t.token1}</Checkbox>)}

        {data.length > 0 && <SteamGraph data={data}/>}</div>)

}


export default PoolView;