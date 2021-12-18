import React, {useEffect, useState} from "react";
import {getTokenList} from "../services/tokenService";


function TokenView()  {

    const [tokenList, setTokenList] = useState<any>(0)

    useEffect (()=> {
        getTokenList()
            .then((tokens)=>setTokenList(tokens));
    },[])


    return (
        <div>
            <h1>Token ...</h1>

        </div>
    );

}


export default TokenView;