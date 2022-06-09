// import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Component } from 'react';
// import { render } from '@testing-library/react';
import * as React from 'react';


const api = axios.create( {
  baseURL: 'https://voyages3-api.crc.rice.edu/voyage/',
  headers: {'Authorization': 'Token 3e9ed2e0fa70a1a5cb6f34eb7a30ebde208ecd8f'},
}) 


class Request extends Component{
    // const [items , setItems] = React.useState([])
  state = {
    items: []
  }

  constructor() {
    super();
    api.post('').then(res=> {
      console.log(res.data)
      this.setState({items: res.data})
    })
    
    // console.log(this.state)
  }
  
}

export default Request;