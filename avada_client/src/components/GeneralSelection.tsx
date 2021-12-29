import Select from "react-select";
import React from "react";


const GeneralSelection = (props:any) => (
    <div style={{width:props.width, margin:props.margin}}>
        <span>{props.title}</span>
        <Select options={props.options} />
    </div>
)

export default GeneralSelection;