import { useEffect, useState } from 'react'
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
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import api from '../../config/api'
import { ICycleInterface } from '../../config/interfaces/ICycle.interface'
import { IResponseInterface } from '../../config/interfaces/IResponse.interface'
import CustomInputField from '../Form/CustomInputField'
import { ICycleCreateInterface } from '../../config/interfaces/ICycleCreate.interface'

const EditCycleComponent = () => {
	const { id } = useParams()
	const [name, setName] = useState<string>('')
	const [max_seats, setMaxSeats] = useState<number>()
	const [programId, setProgramId] = useState<number>()
	const [departureLocationId, setDepartureLocation] = useState<
		number | undefined
	>()
	const [arrivalLocationId, setArrivalLocation] = useState<number | undefined>()
	const [returnLocationId, setReturnLocation] = useState<number | undefined>()
	const [returnArrivalLocationId, setReturnArrivalLocation] = useState<
		number | undefined
	>()
	const [departure_date, setDepartureDate] = useState<string | undefined>('')
	const [arrival_date, setArrivalDate] = useState<string | undefined>('')
	const [return_date, setReturnDate] = useState<string | undefined>('')
	const [return_arrival_date, setReturnArrivalDate] = useState<
		string | undefined
	>('')
	const [cycle, setCycle] = useState<ICycleInterface>()
	const navigate = useNavigate()

	const getCycle = async () => {
		try {
			const response: IResponseInterface<ICycleInterface> =
				await api<ICycleInterface>({
					url: `/cycles/show/${id}`,
				})

			if (response.success) {
				if (response.data) {
					setCycle(response.data)
					setName(response.data.name)
					setMaxSeats(response.data.max_seats)
					//	setDepartureLocation(response.data.departureLocationId)
					//	setArrivalLocation(response.data.arrivalLocationId)
					//	setReturnLocation(response.data.returnLocationId)
					//	setReturnArrivalLocation(response.data.returnArrivalLocationId)
					setDepartureDate(response.data.departure_date)
					setArrivalDate(response.data.arrival_date)
					setReturnDate(response.data.return_date)
					setReturnArrivalDate(response.data.return_arrival_date)
					console.log('res', response.data)
				}
			}
		} catch (error: any) {
			console.log(error)
		}
	}
	useEffect(() => {
		getCycle()
	}, [])

	/// change methods

	const changeDepartureLocation = (event: SelectChangeEvent) => {
		setDepartureLocation(Number(event.target.value))
		console.log(event.target.value)
	}

	const changeArrivalLocation = (event: SelectChangeEvent) => {
		setArrivalLocation(Number(event.target.value))
	}

	const changeReturnLocation = (event: SelectChangeEvent) => {
		setReturnLocation(Number(event.target.value))
	}
	const changeReturnArrivalLocation = (event: SelectChangeEvent) => {
		setReturnArrivalLocation(Number(event.target.value))
	}
	const formatDate = (date: string) => {
		let d = new Date(date),
			month = '' + (d.getMonth() + 1),
			day = '' + d.getDate(),
			year = d.getFullYear()

		if (month.length < 2) month = '0' + month
		if (day.length < 2) day = '0' + day

		return [year, month, day].join('-')
	}

	async function sendData(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const requestBody: ICycleCreateInterface = {
			name,
			programId,
			max_seats,
			departureLocationId,
			arrivalLocationId,
			returnArrivalLocationId,
			returnLocationId,
			arrival_date,
			return_date,
			departure_date,
			return_arrival_date,
		}

		try {
			const response: IResponseInterface<ICycleInterface> =
				await api<ICycleInterface>({
					url: `/cycles/update/${id}`,
					method: 'PUT',
					body: JSON.stringify(requestBody),
				})

			if (response.success) {
				if (response.data) {
					setCycle(response.data)
					navigate('/cycle/list')
				}
			}
		} catch (error: any) {
			console.log(error)
		}
	}

	return (
		<div className="createContainer">
			<form onSubmit={sendData}>
				<div className="TopCycle">
					<h1>Edit Cycle</h1>
					<Grid container direction="column" spacing={2}>
						<Grid item xs={8}>
							<CustomInputField
								type={'text'}
								label={'Cycle Name'}
								value={name}
								setValue={setName}
							/>
						</Grid>
						<Grid item xs={8}>
							<TextField
								className="inputText"
								type="number"
								label="Max Seats"
								variant="outlined"
								required
								value={max_seats}
								onChange={(e) => {
									setMaxSeats(Number(e.target.value))
								}}
							/>
						</Grid>

						<Grid item xs={4}>
							<Grid container>
								<LocalizationProvider dateAdapter={AdapterDateFns}>
									<DatePicker
										label="Departure Date"
										value={departure_date}
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
										value={arrival_date}
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
										value={return_date}
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
										value={return_arrival_date}
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
											value={departureLocationId?.toString()}
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
											value={arrivalLocationId?.toString()}
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
											value={returnLocationId?.toString()}
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
											value={returnArrivalLocationId?.toString()}
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
								<NavLink to={`/cycle/list`}>
									{' '}
									<Button className="createButton" variant="contained">
										Back
									</Button>
								</NavLink>
								<NavLink to={`/cycle/list`}>
									{' '}
									<Button variant="contained" type="submit">
										Create
									</Button>
								</NavLink>
							</Grid>
						</Grid>
					</div>
				</div>
			</form>
		</div>
	)
}

export default EditCycleComponent
