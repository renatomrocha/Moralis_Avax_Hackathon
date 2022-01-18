import SteamGraph from "./charts/steamChart/SteamGraph";
import React, {useEffect, useState} from "react";
import {getInfoForPools} from "../services/dexService";


const PoolView = (props:any) => {

    const [data, setData] = useState(null);

    useEffect(()=> {
        getInfoForPools()
            .then((r:any)=> {
                console.log("Received: ", r);
                setData(r);
            })
    }, [])


    return (<>{data && <SteamGraph data={data}/>}</>)

}


export default PoolView;