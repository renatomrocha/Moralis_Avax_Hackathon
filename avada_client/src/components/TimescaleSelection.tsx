import React, { Component } from 'react'
import Select from 'react-select'

const options = [
    { value: 3, label: '1d' },
    { value: 2, label: '4h' },
    { value: 1, label: '1h' },
    {value: 0, label: '15m'}
]

const TimescaleSelection = (props:any) => (
    <div style={{width:props.width, margin:props.margin}}>
    <span>Time interval</span>
    <Select options={options} />
    </div>
)

export default TimescaleSelection;
