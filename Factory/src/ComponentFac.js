import logo from './logo.svg';
import './App.css';
import axios, { Axios } from 'axios';
import { Component } from 'react';
import { render } from '@testing-library/react';
import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Request from './request';
import { getValue } from '@testing-library/user-event/dist/utils';

// const baseURL = 'https://voyages3-api.crc.rice.edu/voyage/'
// const Token = 'Token 3e9ed2e0fa70a1a5cb6f34eb7a30ebde208ecd8f'



function GetSlider(props) {

    const [range, setRange] = React.useState([0,0])
    const [value, setValue] = React.useState([range[0]/2, range[1]/2])

    var d = new FormData();
    d.append('aggregate_fields', props.params);
    //"voyage_slaves_numbers__imp_total_num_slaves_disembarked"

    const config =  {
        method: 'post',
        baseURL: 'https://voyages3-api.crc.rice.edu/voyage/aggregations',
        headers: {'Authorization': 'Token 4b6dcc9a91cf8e48fc137eeabe026464064a9446'},
        data:d
    }

  React.useEffect(() => {
    axios(config).then(res => {
        setRange([Object.values(res.data)[0]['min'], Object.values(res.data)[0]['max']]);
        setValue([Object.values(res.data)[0]['min'], Object.values(res.data)[0]['max']]);
    }).then(console.log(config))
  }, [])

  function handleCommittedChange(event, newValue) {
    setValue(newValue); 
    console.log(props.params, ": onchange", value);
  }
  
  const handleChange = (event, newValue) => {
      setValue(newValue); 
    //   console.log("left " + value[0]);
    //   console.log("right " + value[1]);
  };


  return (
        <Slider
            size="small"
            min = {range[0]}
            max = {range[1]}
            // defaultValue={range}
            getAriaLabel={() => 'Temperature range'}
            value={value}
            onChange={handleChange}
            onChangeCommitted = {handleCommittedChange}
            valueLabelDisplay="auto"
        />
         );
}

function GetAcuto(props){

}

function GetCheck(props){
  
}



export default GetSlider;