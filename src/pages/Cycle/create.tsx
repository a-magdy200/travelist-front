import { useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import React from 'react'
import Grid from '@mui/material/Grid'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import CustomInputField from '../../components/Form/CustomInputField'
import {IResponseInterface} from "../../config/interfaces/IResponse.interface";
import { ICycleCreateResponse } from '../../config/interfaces/ICycleCreateResponse.iterface'
import api from "../../config/api";

const CreateCycle = () => {
  const [name, setName] = useState<string>('')
  const [maxSeats, setMaxSeats] = useState<string>('0')
  const [departureLocation, setDepartureLocation] = useState<string>('')
  const [arrivalLocation, setArrivalLocation] = useState<string>('')
  const [returnLocation, setReturnLocation] = useState<string>('')
  const [returnArrivalLocation, setReturnArrivalLocation] = useState<string>('')
  const [departureDate, setDepartureDate] = useState<string>('')
  const [arrivalDate, setArrivalDate] = useState<string>('')
  const [returnDate, setReturnDate] = useState<string>('')
  const [returnArrivalDate, setReturnArrivalDate] = useState<string>('')


  const changeDepartureLocation = (event: SelectChangeEvent) => {
    setDepartureLocation(event.target.value as string)
  }

  const changeArrivalLocation = (event: SelectChangeEvent) => {
    setArrivalLocation(event.target.value as string)
  }

  const changeReturnLocation = (event: SelectChangeEvent) => {
    setReturnLocation(event.target.value as string)
  }
  const changeReturnArrivalLocation = (event: SelectChangeEvent) => {
    setReturnArrivalLocation(event.target.value as string)
  }
  const formatDate = (date: string) => {
    const d = new Date(date)
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month
    if (day.length < 2) day = '0' + day

    return [year, month, day].join('-')
  }

  async function sendData(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', name)
    formData.append('programId', '7')
    formData.append('max_seats', maxSeats.toString())
    formData.append('departureLocationId', departureLocation.toString())
    formData.append('arrivalLocationId', arrivalLocation.toString())
    formData.append('returnArrivalLocationId', returnArrivalLocation.toString())
    formData.append('returnLocationId', returnLocation.toString())
    formData.append('arrival_date', arrivalDate)
    formData.append('return_date', returnDate)
    formData.append('departure_date', departureDate)
    formData.append('return_arrival_date', returnArrivalDate)


  try
  {
    const response: IResponseInterface<ICycleCreateResponse> = await api<ICycleCreateResponse>({
      url: "/cycles/create",
      method: "POST",
      body: formData,

    });

    if (response.success) {
      if (response.data) {
        // handle
      }
    }

  }
  catch (error: any) {
      // handle
  }


  }

  return (
    <div className="createContainer">
      <form onSubmit={sendData}>
        <div className="TopCycle">
          <h1>Create Cycle</h1>
          <Grid container direction="column" spacing={2}>
            <Grid item xs={8}>
            <CustomInputField
					  	type={"text"}
						  label={"Cycle Name"}
						  value={name}
						  setValue={setName}
						/>

            </Grid>

            <Grid item xs={8}>
            <CustomInputField
             	type={"number"}
						  label={"Max Seats"}
						  value={maxSeats}
						  setValue={setMaxSeats}
						/>
            </Grid>
            <Grid item xs={4}>
              <Grid container>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Departure Date"
                    value={departureDate}
                    onChange={(newValue) => {
                      if (newValue) {
                        setDepartureDate(formatDate(newValue))
                      }
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>

                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Arrival Date"
                    value={arrivalDate}
                    onChange={(newValue) => {
                      if (newValue) {
                        setArrivalDate(formatDate(newValue))
                      }
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>

                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Return Date"
                    value={returnDate}
                    onChange={(newValue) => {
                      if (newValue) {
                        setReturnDate(formatDate(newValue))
                      }
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>

                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Return Arrival Date"
                    value={returnArrivalDate}
                    onChange={(newValue) => {
                      if (newValue) {
                        setReturnArrivalDate(formatDate(newValue))
                      }
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
          </Grid>
        </div>
        <div className="bottom">
          <h2>Cycle Details</h2>
          <hr />
          <div className="bottomContent">
            <Grid container direction="column" spacing={2}>
              <Grid item xs={8}>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Departure Location
                    </InputLabel>
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
                    <InputLabel id="demo-simple-select-label">
                      Arrival Location
                    </InputLabel>
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
                    <InputLabel id="demo-simple-select-label">
                      Return Location
                    </InputLabel>
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
                    <InputLabel id="demo-simple-select-label">
                      Return Arrival Location
                    </InputLabel>
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
                <Button variant="contained" type="submit">
                  Create
                </Button>
              </Grid>
            </Grid>
          </div>
        </div>
      </form>
    </div>
  )
}

export default CreateCycle
