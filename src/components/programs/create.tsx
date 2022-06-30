
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import  { useState } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Stack from '@mui/material/Stack';
let Create=()=> {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [maxnum, setMaxNum] = useState("");
    const [description, setDescription] = useState("");
    const [country, setCountry] = useState("");
    const [hotel, setHotel] = useState("");
    const [transportation, setTrans] = useState("");
    const [start_date, setStartDate] = useState <Date | null>(
        new Date(),
      );
    const [end_date, setEndtDate] = useState <Date | null>(
        new Date(),
      );  

      ///change methods

     const changeStartDate = (startdate: Date | null) => {
     setStartDate(startdate);
      };
    const changeEndDate = (enddate: Date | null) => {
        setEndtDate(enddate);
      };  

    const changeCountry = (event: SelectChangeEvent) => {
        setCountry(event.target.value as string);
      };

    const changeHotel = (event: SelectChangeEvent) => {
        setHotel(event.target.value as string);
      };
    
    const changeTransporation = (event: SelectChangeEvent) => {
        setTrans(event.target.value as string);
    };

    return (
     <div className="container">
        <div className="left">
        <div className="leftContainer">
        <form>
        <Card  sx={{ maxWidth: 575}} style={{ height: '140vh' }}>
        <CardContent>
        <TextField className='inputText'  label="Program Name" variant="outlined" required value={name} onChange={(e)=>{
                setName(e.target.value)}}/> <br/>
        <TextField className='inputText' label="Price" variant="outlined" required  value={price} onChange={(e)=>{
                setPrice(e.target.value)}} /><br/>
        <TextField className='inputText' label="Max Number" variant="outlined" required  value={price} onChange={(e)=>{
                setMaxNum(e.target.value)}} /><br/>
        <InputLabel id="country-label">Destination Country</InputLabel>
        <Select
          required
          className='inputText'
          labelId="country-label"
          value={country}
          label="Country"
          onChange={changeCountry}
        >
          <MenuItem value={1}>Egypt</MenuItem>
          <MenuItem value={2}>Europe</MenuItem>
          <MenuItem value={3}>Asia</MenuItem>
        </Select><br/>

        <InputLabel id="hotel-label">Destination Hotel</InputLabel>
        <Select
          required
          className='inputText'
          labelId="hotel-label"
          value={hotel}
          label="Hotel"
          onChange={changeCountry}
        >
          <MenuItem value={1}>Hotel 1</MenuItem>
          <MenuItem value={2}>Hotel 2</MenuItem>
          <MenuItem value={3}>Hotel 3</MenuItem>
        </Select><br/>

        <InputLabel id="trans-label">Transportation Type</InputLabel>
        <Select
          required
          className='inputText'
          labelId="trans-label"
          value={transportation}
          label="Transportation"
          onChange={changeTransporation}
        >
          <MenuItem value={1}>plane</MenuItem>
          <MenuItem value={2}>bus</MenuItem>
          <MenuItem value={3}>ship</MenuItem>
        </Select><br/>
      <LocalizationProvider  dateAdapter={AdapterDateFns}>
      <Stack className='inputText' spacing={3}>
      <DesktopDatePicker
          
          label="Start Date "
          inputFormat="MM/dd/yyyy"
          value={start_date}
          onChange={changeStartDate}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack><br/>

      <Stack className='inputText'  spacing={3}>
      <DesktopDatePicker
          label="End Date"
          inputFormat="MM/dd/yyyy"
          value={end_date}
          onChange={changeEndDate}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
      </LocalizationProvider>
         <TextField
          className='inputText'
          label="Description"
          multiline
          maxRows={4}
          required
          value={description} onChange={(e)=>{
            setDescription(e.target.value)}}
        />
        </CardContent>
        <CardActions>
      <Button variant="contained">Back</Button>
      <Button variant="contained"type="submit">Create</Button>
      </CardActions>
        </Card>

        </form>
        </div>
        </div>
        <div className='right'>
        <img className="programImage" src="/assets/travel.png"/>
        </div>
     </div>
    );
  }
  
  export default Create;
  