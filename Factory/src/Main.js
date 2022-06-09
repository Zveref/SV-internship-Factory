import {Link} from "react-router-dom";
import {Box, Tab, Tabs, Typography, Grid} from "@mui/material";
import {useState} from "react";
import Scatter from "./Scatter";
import Pie from "./Pie";
import Bar from "./Bar";
import Script from "/Users/XZW/Downloads/Visualization_CRC_Jun_3-main 2/src/Script.js"
import GetSlider from "./ComponentFac";

function TabPanel(props) {
    const { children, value, index } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function Main() {


  return (
    <div className="Main">
        <Script />
        {/* <Grid>
          <GetSlider />
        </Grid> */}
        
        {/* <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs  value={value} onChange={(event, newValue)=>setValue(newValue)}>
                    <Tab label="Scatter" />
                    <Tab label="Bar" />
                    <Tab label="Pie" />
                </Tabs>
            </Box>
        </Box>
        <TabPanel value={value} index={0}>
            <Scatter/>
        </TabPanel>
        <TabPanel value={value} index={1}>
            <Pie/>
        </TabPanel>
        <TabPanel value={value} index={2}>
            <Bar/>
        </TabPanel> */}
        {/*<nav>*/}
        {/*    <Link to="/scatter">Scatter</Link>*/}
        {/*</nav>*/}
        {/*<nav>*/}
        {/*    <Link to="/bar">Bar</Link>*/}
        {/*</nav>*/}
        {/*<nav>*/}
        {/*    <Link to="/pie">Pie</Link>*/}
        {/*</nav>*/}
    </div>
  );
}

export default Main;
