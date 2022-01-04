import {Stack} from "@chakra-ui/react";
import {useState} from "react";


export default function MultipleSelection(props: any) {

    const [selected, setSelected] = useState<number>(-1);


    const handleHover = (e: any, idx: number) => {
        setSelected(idx);
    }

    const handleLeave = () => {
        setSelected(-1);
    }


    return (
        <div style={{alignContent:'center'}}>
            <div style={{margin:20, marginBottom:0}}>{props.title}</div>

            <Stack direction='row'>
                {
                    props.buttons.map((b:any, idx: number)=>{
                        return (<div id={`select-${idx}`} onClick={()=>props.selectionHandler(b.value)}
                                     style={{backgroundColor:selected==idx?'grey':props.style.buttonColor,
                            margin:10,
                            padding:10,
                            textAlign:"center",
                             // height:20,
                            borderRadius: 10,
                            cursor: 'pointer',
                            }}
                                     onMouseEnter={(e)=> handleHover(e, idx)}
                                     onMouseLeave={(e)=>handleLeave()}
                        >
                            <span>{b.label}</span>
                        </div>)
                    })
                }
            </Stack>
        </div>
    )
}