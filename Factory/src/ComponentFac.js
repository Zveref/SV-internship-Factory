import logo from './logo.svg';
import './App.css';
import axios, { Axios } from 'axios';
import { Component } from 'react';
import { render } from '@testing-library/react';
import * as React from 'react';
import {
  Typography,
  Container,
  Slider,
  Button,
  Checkbox,
  FormControlLabel,
  ListItem,
  Grid,
  List,
  ListItemText,
  Card, CardContent, CardHeader, Box, Paper, Chip, TextField
} from '@mui/material';
import Request from './request';
import { getValue } from '@testing-library/user-event/dist/utils';

const demoLabel = { inputProps: { 'aria-label': 'Checkbox demo' } };

// const baseURL = 'https://voyages3-api.crc.rice.edu/voyage/'
// const Token = 'Token 3e9ed2e0fa70a1a5cb6f34eb7a30ebde208ecd8f'


function ComponentFac(props){
  const raw = props.params.split("***")
  const varDisplay = raw[2]
  const varName = raw[0]
  const varType = raw[1].split('.').pop().slice(0, -2)
  switch(varType){
    case "IntegerField" || "DecimalField":
      return GetSlider(varName, varDisplay);
    case "BooleanField":
      return <Chip label={modifyName(varDisplay)} color="primary" />;
    case "CharField":
      return <Chip label={modifyName(varDisplay)} color="primary" />;
    default:
      return <Chip label="NA" color="primary" />;
  }

}

function modifyName(rawName){
  const raw2 = rawName.replace(/ *\([^)]*\) */g, "")
  const res = raw2.split(":").length > 2 ?raw2.split(':').slice(1).join(':') : raw2;
  return res
}

function GetSlider(varName, varDisplay) {

    const [range, setRange] = React.useState([0,0])
    const [value, setValue] = React.useState([range[0]/2, range[1]/2])

    var d = new FormData();
    d.append('aggregate_fields', varName);
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
    console.log(varName, ": onchange", value);
  }
  
  const handleChange = (event, newValue) => {
      setValue(newValue); 
    //   console.log("left " + value[0]);
    //   console.log("right " + value[1]);
  };


  return (
        <>
        <Typography gutterBottom>{varDisplay}</Typography>
        <Slider
            aria-label = {varDisplay}
            size="small"
            min = {range[0]}
            max = {range[1]}
            // defaultValue={range}
            getAriaLabel={() => 'Temperature range'}
            value={value}
            onChange={handleChange}
            onChangeCommitted = {handleCommittedChange}
            valueLabelDisplay="on"
        />
        </>
         );
}

function GetAcuto(props){

}

function GetCheck(props){
  
}



export default ComponentFac;