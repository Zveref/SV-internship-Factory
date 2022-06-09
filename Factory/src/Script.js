import Plot from 'react-plotly.js';
import {useState, useEffect} from "react";
import {
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
import {TreeView, TreeItem} from '@mui/lab';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import * as React from 'react';
import { useQuery } from 'react-query'
import { NavLink, useNavigate } from 'react-router-dom';
import {base_url, headers} from "./status";
import ComponentFac from "./ComponentFac";
import Autocomplete from '@mui/material/Autocomplete';
import { styled } from '@mui/material/styles';
const demoLabel = { inputProps: { 'aria-label': 'Checkbox demo' } };

const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },
    { label: '12 Angry Men', year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: 'Pulp Fiction', year: 1994 },
    {
      label: 'The Lord of the Rings: The Return of the King',
      year: 2003,
    },
    { label: 'The Good, the Bad and the Ugly', year: 1966 },
    { label: 'Fight Club', year: 1999 },
    {
      label: 'The Lord of the Rings: The Fellowship of the Ring',
      year: 2001,
    },
    {
      label: 'Star Wars: Episode V - The Empire Strikes Back',
      year: 1980,
    },
    { label: 'Forrest Gump', year: 1994 },
    { label: 'Inception', year: 2010 },
    {
      label: 'The Lord of the Rings: The Two Towers',
      year: 2002,
    },
    { label: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { label: 'Goodfellas', year: 1990 },
    { label: 'The Matrix', year: 1999 },
    { label: 'Seven Samurai', year: 1954 },
    {
      label: 'Star Wars: Episode IV - A New Hope',
      year: 1977,
    },
    { label: 'City of God', year: 2002 },
    { label: 'Se7en', year: 1995 },
    { label: 'The Silence of the Lambs', year: 1991 },
    { label: "It's a Wonderful Life", year: 1946 },
    { label: 'Life Is Beautiful', year: 1997 },
    { label: 'The Usual Suspects', year: 1995 },
    { label: 'Léon: The Professional', year: 1994 },
    { label: 'Spirited Away', year: 2001 },
    { label: 'Saving Private Ryan', year: 1998 },
    { label: 'Once Upon a Time in the West', year: 1968 },
    { label: 'American History X', year: 1998 },
    { label: 'Interstellar', year: 2014 },
    { label: 'Casablanca', year: 1942 },
    { label: 'City Lights', year: 1931 },
    { label: 'Psycho', year: 1960 },
    { label: 'The Green Mile', year: 1999 },
    { label: 'The Intouchables', year: 2011 },
    { label: 'Modern Times', year: 1936 },
    { label: 'Raiders of the Lost Ark', year: 1981 },
    { label: 'Rear Window', year: 1954 },
    { label: 'The Pianist', year: 2002 },
    { label: 'The Departed', year: 2006 },
    { label: 'Terminator 2: Judgment Day', year: 1991 },
    { label: 'Back to the Future', year: 1985 },
    { label: 'Whiplash', year: 2014 },
    { label: 'Gladiator', year: 2000 },
    { label: 'Memento', year: 2000 },
    { label: 'The Prestige', year: 2006 },
    { label: 'The Lion King', year: 1994 },
    { label: 'Apocalypse Now', year: 1979 },
    { label: 'Alien', year: 1979 },
    { label: 'Sunset Boulevard', year: 1950 },
    {
      label: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
      year: 1964,
    },
    { label: 'The Great Dictator', year: 1940 },
    { label: 'Cinema Paradiso', year: 1988 },
    { label: 'The Lives of Others', year: 2006 },
    { label: 'Grave of the Fireflies', year: 1988 },
    { label: 'Paths of Glory', year: 1957 },
    { label: 'Django Unchained', year: 2012 },
    { label: 'The Shining', year: 1980 },
    { label: 'WALL·E', year: 2008 },
    { label: 'American Beauty', year: 1999 },
    { label: 'The Dark Knight Rises', year: 2012 },
    { label: 'Princess Mononoke', year: 1997 },
    { label: 'Aliens', year: 1986 },
    { label: 'Oldboy', year: 2003 },
    { label: 'Once Upon a Time in America', year: 1984 },
    { label: 'Witness for the Prosecution', year: 1957 },
    { label: 'Das Boot', year: 1981 },
    { label: 'Citizen Kane', year: 1941 },
    { label: 'North by Northwest', year: 1959 },
    { label: 'Vertigo', year: 1958 },
    {
      label: 'Star Wars: Episode VI - Return of the Jedi',
      year: 1983,
    },
    { label: 'Reservoir Dogs', year: 1992 },
    { label: 'Braveheart', year: 1995 },
    { label: 'M', year: 1931 },
    { label: 'Requiem for a Dream', year: 2000 },
    { label: 'Amélie', year: 2001 },
    { label: 'A Clockwork Orange', year: 1971 },
    { label: 'Like Stars on Earth', year: 2007 },
    { label: 'Taxi Driver', year: 1976 },
    { label: 'Lawrence of Arabia', year: 1962 },
    { label: 'Double Indemnity', year: 1944 },
    {
      label: 'Eternal Sunshine of the Spotless Mind',
      year: 2004,
    },
    { label: 'Amadeus', year: 1984 },
    { label: 'To Kill a Mockingbird', year: 1962 },
    { label: 'Toy Story 3', year: 2010 },
    { label: 'Logan', year: 2017 },
    { label: 'Full Metal Jacket', year: 1987 },
    { label: 'Dangal', year: 2016 },
    { label: 'The Sting', year: 1973 },
    { label: '2001: A Space Odyssey', year: 1968 },
    { label: "Singin' in the Rain", year: 1952 },
    { label: 'Toy Story', year: 1995 },
    { label: 'Bicycle Thieves', year: 1948 },
    { label: 'The Kid', year: 1921 },
    { label: 'Inglourious Basterds', year: 2009 },
    { label: 'Snatch', year: 2000 },
    { label: '3 Idiots', year: 2009 },
    { label: 'Monty Python and the Holy Grail', year: 1975 },
  ];

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    fontSize: 12,
    fontWeight: 'bold',
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));



function Script() {
    let navigate = useNavigate();
    const [first, setFirst] = useState(1);
    const [second, setSecond] = useState(2);
    const [third, setThird] = useState(3);
    const [markColor, setMarkColor] = useState("red");
    const [lineColor, setLineColor] = useState("red");
    const [markSize, setMarkSize] = useState(12);
    const [labels, setLabels] = useState([]);

    const [types, setTypes] = useState([]);
    // var data = "init value";
    // var a={s: "dasd", d: "asda"}
    // a[s] ===undefined
    const [data, setData] = useState("init value");


    const { isLoading, error, data: options } = useQuery('repoData', () => {
            return fetch(base_url + "voyage/", {
                method: "OPTIONS",
                headers: headers
            }).then(res => res.json())
        }
    )


    function isChildren(key) {
        return key !== "type" && key !== "label" && key !== "flatlabel"
    }

    function isLast(node) {
        return Object.keys(node).length <= 3
    }

    function modifyName(rawName){
        const raw2 = rawName.replace(/ *\([^)]*\) */g, "")
        const res = raw2.split(":").length > 2 ?raw2.split(':').slice(1).join(':') : raw2;
        return res
    }

    var count = 0;
    const renderTree = (nodes, name) => (
        <TreeItem key={nodes.label} nodeId={""+count++} label={nodes.label? nodes.label:"Menu"}>
            { Object.keys(nodes).map((key) =>
                isChildren(key)
                    ? isLast(nodes[key])
                        ? <ListItem key={key} disablePadding>
                            <Checkbox  onChange={(event, checked) => handleCheck(checked, name ? (name.slice(2)+"__"+key) : key, nodes[key].type, nodes[key].flatlabel)}/>
                            {/* <Checkbox onChange={(event, checked) => {
                                if(key === "type"){handleCheck(checked, nodes[key].split(',').pop())}
                                }}/> */}
                            <ListItemText primary={key+" ("+nodes[key].flatlabel+")"} secondary={nodes[key].type}/>
                        </ListItem>
                        : renderTree(nodes[key], name+"__"+key)
                    : null
            )
            }
        </TreeItem>
    );

    function handleCheck(isChecked, label, type, fLable){
        const newLable = label + "***" + type + "***" + fLable
        // if (isChecked) {
        //     setLabels([...labels, label])
        //     setTypes([...types, type])
        // }else{
        //     setLabels(labels.filter((i) => i !== label))
        //     setTypes(types.filter((i) => i !== type))
        // }
        // console.log(newLable);
        
        if (isChecked) {
            setLabels([...labels, newLable])
        }else{
            setLabels(labels.filter((i) => i !== newLable))
        }
        // console.log("types" + types)
        // console.log(labelMap)
    }

    function handleOnClick() {
        var formdata = new FormData();
        formdata.append("hierarchical", "False");
        fetch(base_url + "voyage/", {
            method: "POST",
            body: formdata,
            headers: {'Authorization': headers}
        }).then(res => res.json()).then(res => {
            setData(res);
            // data = res;
        })
        console.log(data);
    }

    function handleClick(event) {
        event.preventDefault();
        navigate("/pie");
    }

    if (isLoading) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message

    return (
        <Container>
            <Button onClick={handleClick}>Pie</Button>
            <NavLink to={"/pie"}>Pie</NavLink>

            //leftside
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Card sx={{height: 500, flexGrow: 1, maxWidth: 800, overflowY: 'auto'}}>
                        <CardContent>
                            <TreeView
                                aria-label="option menu"
                                defaultCollapseIcon={<ExpandMoreIcon/>}
                                defaultExpandIcon={<ChevronRightIcon/>}
                            >   
                                {renderTree(options, "")}
                            </TreeView>
                        </CardContent>
                    </Card>
                </Grid>

                {/* <div>Right-up-side</div> */}
                <Grid item xs={4}>
                    <Card  sx={{ flexGrow: 1, height: 500, overflowY: 'auto'}}>
                        <CardHeader h1={true}
                            title="Selected Options"
                        />
                        <CardContent>
                            <Box>
                                <Grid container>

                                    {labels.map((item) =>
                                        {

                                            // const varName = item.split("***")[2]
                                            // const searchBy = item.split("***")[0]
                                            // const varAttri = item.split("***")[1].split('.').pop().slice(0, -2);
                                            // switch(varAttri){
                                            //     case "BooleanField":
                                            //         return (<Grid item wrap="nowrap" xs={12}>{modifyName(varName)}<Checkbox {...demoLabel} defaultChecked /></Grid>);     
                                            //     case "CharField":
                                            //         return (<Grid item wrap="nowrap" xs={12}>{modifyName(varName)}<Autocomplete
                                            //             disablePortal
                                            //             id="combo-box-demo"
                                            //             options={top100Films}
                                            //             sx={{ width: 300 }}
                                            //             renderInput={(params) => <TextField {...params} label="Movie" />}
                                            //           /></Grid>); 
                                            //     case "DateTimeField":
                                            //         return (<Grid item xs={6}><Chip label="DateSelector" color="primary" /></Grid>); 
                                            //     // default:
                                            //     //     return (<Grid item wrap="nowrap" xs={varName.length > 20 ? 12 : varName.length > 10 ? 6 : 3}>{varName}<Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" /></Grid>); 
                                            //     case "IntegerField" || "DecimalField":
                                            //         return (<Grid  xs={12} padding={1}><Item>{modifyName(varName)}<GetSlider params={searchBy} /></Item></Grid>); 
                                            //     default: 
                                            //         return (<Grid item xs={12}><Chip label={modifyName(varName)} color="primary" /></Grid>); 

                                            // }
                                            return <Grid  xs={12} padding={1}><Item><ComponentFac params={item} /></Item></Grid>
                                        }
                                    )}
                                </Grid>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
                

            <Container>
                <Card>
                    <CardHeader title={"WhiteBoard"}/>
                    <CardContent>
                        <Button onClick={handleOnClick}>run get option</Button>
                        {/*<TextField id="outlined-basic" label="Outlined" variant="outlined"/>*/}
                        <p>{JSON.stringify(data)}</p>
                    </CardContent>
                </Card>
            </Container>

        </Container>
    );
}

export default Script;