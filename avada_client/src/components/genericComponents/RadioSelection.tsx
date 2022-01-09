import React, {Component, useEffect, useState} from 'react'
import Select from 'react-select'
import {Radio, RadioGroup, Stack} from "@chakra-ui/react";


const RadioSelection = (props:any) => {

    const [value, setValue] = useState(props.value);

    useEffect(() => {
        // setValue(props.value);
    }, [props.value]);

    return (
        <div style={{width: props.width, margin: props.margin}}>
            <h3>{props.title}</h3>
            <RadioGroup onChange={props.onChange} value={props.value}>
                <Stack direction='row'>
                    {props.options.map((o: any) => (<Radio value={o.value}>{o.label}</Radio>))}
                </Stack>
            </RadioGroup>
        </div>
    )

}

export default RadioSelection;
