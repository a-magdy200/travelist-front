import  { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import React from 'react';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


let CreateCycle=()=> {
    const [name, setName] = useState<string>("");
    const [maxSeats, setMaxSeats] = useState<number>();
    const [departureLocation, setDepartureLocation] = useState<string>("");
    const [arrivalLocation, setArrivalLocation] = useState<string>("");
    const [returnLocation, setReturnLocation] = useState<string>("");
    const [returnArrivalLocation, setReturnArrivalLocation] = useState<string>("");
    const [departureDate, setDepartureDate] = useState<string|null>("");
    const [arrivalDate, setArrivalDate] = useState<string|null>("");
    const [returnDate, setReturnDate] = useState<string|null>("");
    const [returnArrivalDate, setReturnArrivalDate] = useState<string|null>("");

    //styles
   
          
     const ITEM_HEIGHT = 48;
     const ITEM_PADDING_TOP = 8;
     const MenuProps = {
       PaperProps: {
         style: {
           maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
           width: 250,
         },
       },
     };

   
            ///change methods

   const changeDepartureLocation = (event: SelectChangeEvent) => {
       setDepartureLocation(event.target.value as string);
       };    
    
   const changeArrivalLocation = (event: SelectChangeEvent) => {
       setArrivalLocation( event.target.value as string);
        };    

    const changeReturnLocation = (event: SelectChangeEvent) => {
        setReturnLocation(event.target.value as string);
        };    
    const changeReturnArrivalLocation = (event: SelectChangeEvent) => {
        setReturnArrivalLocation(event.target.value as string);
        };    

    return(
     <div className="createContainer"> 
     <div className='TopCycle'>
        <h1>Create Cycle</h1>
        <Grid container direction='column' spacing={2}>
        <Grid item xs={8}>
          <TextField className='inputText'  label="Cycle Name" variant="outlined" required value={name} onChange={(e)=>{
                setName(e.target.value)}}/> 
        </Grid>
        <Grid item xs={4}>
         <Grid container > 
      <LocalizationProvider dateAdapter={AdapterLuxon}>
      <DatePicker
        label="Departure Date"
        value={departureDate }
        onChange={(newValue) => {
          setDepartureDate(newValue);console.log(newValue);

        }}
        renderInput={(params) => <TextField {...params} />}
      />
      </LocalizationProvider>

      <LocalizationProvider dateAdapter={AdapterLuxon}>
      <DatePicker
        label="Arrival Date"
        value={arrivalDate }
        onChange={(newValue) => {
          setArrivalDate(newValue);console.log(newValue);

        }}
        renderInput={(params) => <TextField {...params} />}
      />
      </LocalizationProvider>

      <LocalizationProvider dateAdapter={AdapterLuxon}>
      <DatePicker
        label="Return Date"
        value={returnDate }
        onChange={(newValue) => {
          setReturnDate(newValue);console.log(newValue);

        }}
        renderInput={(params) => <TextField {...params} />}
      />
      </LocalizationProvider>

      <LocalizationProvider dateAdapter={AdapterLuxon}>
      <DatePicker
        label="Return Arrival Date"
        value={returnArrivalDate }
        onChange={(newValue) => {
          setReturnArrivalDate(newValue);console.log(newValue);

        }}
        renderInput={(params) => <TextField {...params} />}
      />
      </LocalizationProvider>

      </Grid> 
      </Grid>
      </Grid>
     </div>
     <div className='bottom'>
            <h2>Cycle Details</h2>
        <hr/>
         <div className='bottomContent'>
         <Grid container direction='column' spacing={2}>

         <Grid item xs={8}>
         <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Departure Location</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={departureLocation}
          label="Departure Location"
          onChange={changeDepartureLocation}
        >
          <MenuItem value={1}>Egypt</MenuItem>
          <MenuItem value={2}>London</MenuItem>
        </Select>
      </FormControl>
    </Box>
         </Grid>

         <Grid item xs={8}>
         <Box sx={{ minWidth: 120 }}>
         <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Arrival Location</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={arrivalLocation}
          label="Arrival Location"
          onChange={changeArrivalLocation}
        >
          <MenuItem value={1}>Egypt</MenuItem>
          <MenuItem value={2}>London</MenuItem>
        </Select>
        </FormControl>
        </Box>
         </Grid>

         <Grid item xs={8}>
         <Box sx={{ minWidth: 120 }}>
         <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Return Location</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={returnLocation}
          label="Return Location"
          onChange={changeReturnLocation}
        >
          <MenuItem value={1}>Egypt</MenuItem>
          <MenuItem value={2}>London</MenuItem>
        </Select>
      </FormControl>
    </Box>
      </Grid>
      
      <Grid item xs={8}>
         <Box sx={{ minWidth: 120 }}>
         <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Return Arrival Location</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={returnLocation}
          label="Return Arrival Location"
          onChange={changeReturnArrivalLocation}
        >
          <MenuItem value={1}>Egypt</MenuItem>
          <MenuItem value={2}>London</MenuItem>
        </Select>
      </FormControl>
      </Box>
      </Grid>

      </Grid>

         </div>
     </div>
     </div>  
    );
  }
  
  export default CreateCycle;
  