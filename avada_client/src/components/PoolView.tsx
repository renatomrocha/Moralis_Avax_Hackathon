import SteamGraph from "./charts/steamChart/SteamGraph";
import React, {useEffect, useState} from "react";
import {getInfoForPools, getInfoForPoolsForPair, getPoolList} from "../services/dexService";
import {Checkbox, HStack} from "@chakra-ui/react";
import Title from "./genericComponents/Title";
import {ColorPalette} from "./styles/color_palette";
import DateSlider from "./genericComponents/DateSlider";
import {dateFromTimeStamp} from "../utils/dateUtils";
import ExportIcon from "./genericComponents/ExportIcon";

const addressesToInclude = ["0x8fb5bd3ac8efd05dacae82f512dd03e14aadab73","0x72c3438cf1c915ecf5d9f17a6ed346b273d5bf71","0x3daf1c6268362214ebb064647555438c6f365f96","0x454e67025631c065d3cfad6d71e6892f74487a15"
    ,"0xfe15c2695f1f920da45c30aae47d11de51007af9","0x1643de2efb8e35374d796297a9f95f64c082a8ce","0x87dee1cc9ffd464b79e058ba20387c1984aed86a","0xa6908c7e3be8f4cd2eb704b5cb73583ebf56ee62"
    ,"0x6f3a0c89f611ef5dc9d96650324ac633d02265d3","0xd5a37dc5c9a396a03dd1136fc76a1a02b1c88ffa","0xb5c9e891af3063004a441ba4fab4ca3d6deb5626","0xed8cbd9f0ce3c6986b22002f03c6475ceb7a6256",
    "0x2774516897ac629ad3ed9dcac7e375dda78412b9","0x67926d973cd8ee876ad210faaf7dffa99e414acf","0x63abe32d0ee76c05a11838722a63e012008416e6","0xa389f9430876455c36478deea9769b7ca4e3ddb1",
    "0x781655d802670bba3c89aebaaea59d3182fd755d","0x2e02539203256c83c7a9f6fa6f8608a32a2b1ca2","0xf64e1c5b6e17031f5504481ac8145f4c3eab4917","0xb9f425bc9af072a91c423e31e9eb7e04f226b39d",
    "0x62475f52add016a06b398aa3b2c2f2e540d36859","0x140cac5f0e05cbec857e65353839fddd0d8482c1","0xc2ea99c031b05ae03044c857c78afb5671dee96b","0xc3e6d9f7a3a5e3e223356383c7c055ee3f26a34f",
    "0x113f413371fc4cc4c9d6416cf1de9dfd7bf747df","0x361221991b3b6282ff3a62bc874d018bfaf1f8c8","0x199fb78019a08af2cb6a078409d0c8233eba8a0c","0x7b7617c7b2236d7871741783cae8bcc222c2e05d",
    "0xbe4b31fce1885fcd0e3351aa8b392fbcc4ef6036","0x50141c21e4e861d4b2cbeb825b9a2b5e5e09a186"]



const PoolView = (props:any) => {

    const [data, setData] = useState<any>([]);
    const [poolList, setPoolList] = useState<any[]>([]);
    const [activePools,setActivePools] = useState<any>([]);
    const [graphReady, setGraphReady] = useState<boolean>(false);
    const [keys, setKeys] = useState<string[]>([]);
    const [lastRequestLength, setLastRequestLength] = useState<any>(0);
    const [initialOffset, setInitialOffset] = useState((Date.now() - 30 * 24 * 60 * 60 * 1000) / 1000); // 30 days in the past in seconds
    const [startDate, setStartDate] = useState<any>(dateFromTimeStamp(initialOffset));
    const [endDate, setEndDate] = useState(dateFromTimeStamp(Date.now() / 1000));
    const [endOffset, setEndOffset] = useState(Math.round(Date.now() / 1000));

    useEffect(()=> {
        getPoolList()
            .then((p)=>{
                console.log("Pools: ", p);
                const pools = p.filter(r=>addressesToInclude.includes(r.pairAddress));
                setPoolList(pools);
            });
    }, [])

    useEffect(()=> {
        if(poolList.length > 0) {
            console.log("Will activate: ", poolList[0]);
            setActivePools([poolList[0]]);
            console.log("Active pool is: ", activePools);
        }
    },[poolList])

    const handleCheckBoxChange = (e:any,idx:number) => {
        console.log("CheckBoxChanged to: ", e.target.checked);
        console.log("With value: ", e.target.value);

        if(e.target.checked) {
            // Add new token to active pool list
            setActivePools([...activePools, poolList[idx]]);
        } else {
            // Remove using value...
            console.log("Filtering: ", e.target.value);
            setActivePools(activePools.filter((ap:any)=>ap.pairAddress != e.target.value));
        }

        //Chec

    }

    useEffect(()=>{
        console.log("Current list is: ", activePools);
        console.log("Last request length: ", lastRequestLength);

        if(activePools.length > 0){

            if(activePools.length > lastRequestLength) {
                getInfoForPoolsForPair(activePools[activePools.length -1].pairAddress)
                    .then((d)=>{
                        const newArr : any[] = [];
                        const newKey = 'tvl'+d[0].symbol0+'-'+d[0].symbol1;

                        if(data.length >0) {
                            d.map((nd:any, idx:number) => {
                                const obj : any = {};
                                obj[newKey] = nd.tvl0 + nd.tvl1;
                                Object.assign(data[idx],{...obj})
                                // newArr.push(obj);
                            })
                            setData(()=>[...data]);

                        } else {
                            d.map((nd:any, idx:number) => {
                                const obj : any = {};
                                obj[newKey] = nd.tvl0 + nd.tvl1;
                                obj["timestamp"] = nd.timestamp;
                                newArr.push(obj);
                            })
                            setData(()=>[...newArr]);
                        }
                        keys.push(newKey)
                        setKeys(keys);
                    })
            } else {
                // Remove from current array
                const addressArray = activePools.map((ap:any)=>`tvl${ap.token0}-${ap.token1}`);
                console.log("Address array is: ", addressArray);
                const keys = Object.keys(data[0]).filter(k=>k!="timestamp");
                console.log("Keys is: ", keys);
                const addressToRemove = keys.filter((a:any)=>!addressArray.includes(a))[0];
                console.log("Address to remove: ", addressToRemove);
                const newArr = data.map((d:any)=>{
                    delete d[addressToRemove];
                    return d;
                });
                console.log("New data arr: ", data);
                const keyIndex = keys.indexOf(addressToRemove);
                const newKeys = keys.filter((k)=>k!=addressToRemove);
                setKeys(newKeys);
                setData(newArr)
            }

        }
        setLastRequestLength(activePools.length);

    },[activePools])


    useEffect(()=>{
        console.log("Keys changed to: ", keys);
    },[keys])


    const checkIsActive = (idx:number, t:any) : boolean => {
        return `${t.token0}/${t.token1}` == `${activePools[idx]?.token0}/${activePools[idx]?.token1}`
    }


    return (<div>
        <Title title="Pools" hasInfo></Title>

        <HStack>
            {activePools.length>0 && (<div style={{
                height: 600,
                overflowY: 'scroll',
                width: 250,
                borderColor: ColorPalette.thirdColor,
                borderWidth: 1,
                borderRadius: 20,
                padding: 20
            }}>

                <ul style={{ listStyleType: 'none'}}>
                    {poolList.map((t: any, idx: number) => <li style={{marginBottom:5}}><Checkbox size='lg' style={{margin: 5}}
                                                                                                  defaultChecked={checkIsActive(idx,t)}
                                                                                                  value={t.pairAddress}
                                                                                                  onChange={(e) => handleCheckBoxChange(e, idx)}>{t.token0}/{t.token1}</Checkbox></li>)}
                </ul>
            </div>)}


            <div style={{height:600, borderWidth:1, borderRadius:20, marginLeft: 60,marginBottom:20}}>
                {data.length > 0 && <SteamGraph data={data} keys={keys}/>}
            </div>

        </HStack>
        <HStack>
        <DateSlider style={{marginTop: 50}} startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate}
    initialOffset={initialOffset} setInitialOffset={setInitialOffset} endOffset={endOffset} setEndOffset={setEndOffset} sliderStep={24 * 60 * 60}/>
        <ExportIcon/>
        </HStack>
        {/*{poolList.map((t:any, idx: number) =>*/}
        {/*    <Checkbox style={{margin:5}} defaultChecked={false} value={t.pairAddress} onChange={(e)=>handleCheckBoxChange(e, idx)}>{t.token0}/{t.token1}</Checkbox>)}*/}




    </div>)


}


export default PoolView;