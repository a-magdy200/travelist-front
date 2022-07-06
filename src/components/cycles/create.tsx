import  { useState } from 'react';
import { DateTime } from 'luxon';
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
    const [maxSeats, setMaxSeats] = useState<string>("0");
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
       console.log(event.target.value as string)
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
      const formatDate=(date:string)=> {
          let d = new Date(date),
              month = '' + (d.getMonth() + 1),
              day = '' + d.getDate(),
              year = d.getFullYear();
  
          if (month.length < 2) month = '0' + month;
          if (day.length < 2) day = '0' + day;
  
          return [year, month, day].join('-');
      }


      async function sendData(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault(); 
        const formData = new FormData();
        formData.append('name', name);
        formData.append('programId', '7');
        formData.append('max_seats', maxSeats.toString() );
        formData.append('departureLocationId', departureLocation.toString() );
        formData.append('arrivalLocationId', arrivalLocation.toString() );
        formData.append('returnArrivalLocationId', returnArrivalLocation.toString() );
        formData.append('returnLocationId', returnLocation.toString() );
        formData.append('arrival_date', arrivalDate as string );
        formData.append('return_date', returnDate as string );
        formData.append('departure_date', departureDate as string );
        formData.append('return_arrival_date', returnArrivalDate  as string);
       
        console.log(formData);

        const response= await fetch("http://localhost:4000/cycles/create",{
            mode: 'no-cors',
            method:"POST",
            body: formData  
        })
        .then(response => {
         console.log (response)
        })
       
        .catch(e=>{
          console.log(e)
        })
             
      }


    return(
     <div className="createContainer"> 
     <form onSubmit={sendData} >
     <div className='TopCycle'>
        <h1>Create Cycle</h1>
        <Grid container direction='column' spacing={2}>
        <Grid item xs={8}>
          <TextField className='inputText'  label="Cycle Name" variant="outlined" required value={name} onChange={(e)=>{
                setName(e.target.value)}}/> 
        </Grid>
        <Grid item xs={8}>
        <TextField className='inputText' type="number" label="Max Seats" variant="outlined" required value={maxSeats} onChange={(e)=>{
             setMaxSeats(e.target.value);
             console.log((e.target.value))}}/>
        </Grid>
        <Grid item xs={4}>
         <Grid container > 
      <LocalizationProvider dateAdapter={AdapterLuxon}>
      <DatePicker
        label="Departure Date"
        value={departureDate }
        onChange={(newValue) => {
          if(newValue){
            setDepartureDate(formatDate(newValue))
            console.log(departureDate);
            }
  
        }}
        renderInput={(params) => <TextField {...params} />}
      />
      </LocalizationProvider>

      <LocalizationProvider dateAdapter={AdapterLuxon}>
      <DatePicker
        label="Arrival Date"
        value={arrivalDate }
        onChange={(newValue) => {
          if(newValue){
          setArrivalDate(formatDate(newValue))
          console.log(arrivalDate);
          }

        }}
        renderInput={(params) => <TextField {...params} />}
      />
      </LocalizationProvider>

      <LocalizationProvider dateAdapter={AdapterLuxon}>
      <DatePicker
        label="Return Date"
        value={returnDate }
        onChange={(newValue) => {
          if(newValue){
            setReturnDate(formatDate(newValue))
            console.log(returnDate);
            }
  
        }}
        renderInput={(params) => <TextField {...params} />}
      />
      </LocalizationProvider>

      <LocalizationProvider dateAdapter={AdapterLuxon}>
      <DatePicker
        label="Return Arrival Date"
        value={returnArrivalDate }
        onChange={(newValue) => {
          if(newValue){
            setReturnArrivalDate(formatDate(newValue))
            console.log(formatDate(newValue));
            }
  
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
          value={returnArrivalLocation}
          label="Return Arrival Location"
          onChange={changeReturnArrivalLocation}
        >
          <MenuItem value={1}>Egypt</MenuItem>
          <MenuItem value={2}>London</MenuItem>
        </Select>
      </FormControl>
      </Box>
      </Grid>
      <Grid item xs={8}>
      <Button variant="contained" type="submit">Create</Button>
      </Grid>

      </Grid>

      </div>
    </div>
     </form>
     </div>  
    );
  }
  
  export default CreateCycle;
  