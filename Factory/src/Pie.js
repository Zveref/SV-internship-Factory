import React, { Component, PureComponent, useState, useEffect } from 'react'
// import { Form, Input, InputNumber, Radio, Modal, Cascader ,Tree} from 'antd'
import axios from 'axios'
import Plot from 'react-plotly.js';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { FormControlLabel, RadioGroup } from '@mui/material';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import {donut_value_vars, donut_name_vars} from './vars';



const option_url = '/voyage/' + '?hierarchical=false'

const AUTH_TOKEN = process.env.REACT_APP_AUTHTOKEN;
axios.defaults.baseURL = process.env.REACT_APP_BASEURL;
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

console.log(process.env.REACT_APP_BASEURL)

// var donut_value_vars = require('./vars');
// var donut_name_vars = require('./vars');

// var donut_value_vars=[
//     'voyage_dates__imp_length_home_to_disembark',
//     'voyage_dates__length_middle_passage_days',
//     'voyage_ship__tonnage_mod',
//     'voyage_crew__crew_voyage_outset',
//     'voyage_crew__crew_first_landing',
//     'voyage_slaves_numbers__imp_total_num_slaves_embarked',
//     'voyage_slaves_numbers__imp_total_num_slaves_disembarked',
//     'voyage_slaves_numbers__imp_jamaican_cash_price'
// ]

// var donut_name_vars=[
//     'voyage_ship__imputed_nationality__name',
//     'voyage_ship__rig_of_vessel__name',
//     'voyage_outcome__particular_outcome__name',
//     'voyage_outcome__outcome_slaves__name',
//     'voyage_outcome__outcome_owner__name',
//     'voyage_outcome__vessel_captured_outcome__name',
//     'voyage_outcome__resistance__name',
//     'voyage_itinerary__imp_port_voyage_begin__place',
//     'voyage_itinerary__imp_region_voyage_begin__region',
//     'voyage_itinerary__imp_principal_place_of_slave_purchase__place',
//     'voyage_itinerary__imp_principal_region_of_slave_purchase__region',
//     'voyage_itinerary__imp_principal_port_slave_dis__place',
//     'voyage_itinerary__imp_principal_region_slave_dis__region',
//     'voyage_itinerary__imp_broad_region_slave_dis__broad_region',
//     'voyage_itinerary__place_voyage_ended__place',
//     'voyage_itinerary__region_of_return__region'
// ]

function Pie () {

    const [plot_field, setarrx] = useState([])
    const [plot_value, setarry] = useState([])

    // const [option_field, setField] = React.useState(scatter_plot_x_vars[0]);
    // const [option_value, setValue] = React.useState(scatter_plot_y_vars[1]);

    const [option, setOption] = useState({
        field: donut_name_vars[0],
        value: donut_value_vars[1]
    })

    const [aggregation, setAgg] = React.useState('sum');

    const {sum, average} = aggregation;

    const handleChange_agg = (event) => {
        setAgg(event.target.value);
    };

    const handleChange = (event, name) => {
        setOption({
            ...option,
            [name]: event.target.value,
        })
    }
    useEffect(() => {
        var group_by = option.field
        var value = option.value
        var agg = aggregation


        var data = new FormData();
        data.append('hierarchical', 'False');

        data.append('groupby_fields', option.field)
        data.append('groupby_fields', option.value)
        data.append('agg_fn', aggregation)
        data.append('cachename','voyage_export')

        axios.post('/voyage/groupby', data=data)
            .then(function (response) {

                setarrx(Object.keys(response.data[value]))
                setarry(Object.values(response.data[value]))

                // console.log(plot_value)

            })
            .catch(function (error) {
                console.log(error);
            });

    }, [option.field, option.value, aggregation]);


    return (
        <div>
            <div>
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">X Field</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={option.field}
                            onChange={(event) => {handleChange(event, "field")}}
                            name="field"
                        >
                            {donut_name_vars.map((option) => (
                                <MenuItem value={option}>
                                    {option}
                                </MenuItem>
                            ))}

                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Y Field</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={option.value}
                            name="value"
                            onChange={(event) => {handleChange(event, "value")}}
                        >
                            {donut_value_vars.map((option) => (
                                <MenuItem value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                            {/* <MenuItem value={scatter_plot_x_vars}>{scatter_plot_x_vars}</MenuItem> */}

                        </Select>
                    </FormControl>
                </Box>
            </div>
            <div>
                <FormControl>
                    <FormLabel id="demo-controlled-radio-buttons-group">Aggregation Function</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={aggregation}
                        onChange={handleChange_agg}
                    >
                        <FormControlLabel value="sum" control={<Radio />} label="Sum" />
                        <FormControlLabel value="mean" control={<Radio />} label="Average" />
                    </RadioGroup>
                </FormControl>
            </div>

            <div>
                <Plot
                    data={[
                        {
                            labels: plot_field,
                            values: plot_value,
                            type: 'pie',
                            mode: 'lines+markers',
                        }
                    ]}
                    layout={ {width: 1000, height: 500, title: 'Pie Plot'} }
                />
            </div>
        </div>
    )


}


export default Pie;