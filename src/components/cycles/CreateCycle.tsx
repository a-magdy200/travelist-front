import { useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { SelectChangeEvent } from '@mui/material/Select'
import React from 'react'
import Grid from '@mui/material/Grid'
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import CustomInputField from '../Form/CustomInputField'
import { ICycleInterface } from '../../config/interfaces/ICycle.interface'
import { IResponseInterface } from '../../config/interfaces/IResponse.interface'
import api from '../../config/api'
import { NavLink, useNavigate, useParams } from 'react-router-dom'

let CreateCycleComponent = () => {
	let { id } = useParams()
	let programId = Number(useParams().id)
	const [name, setName] = useState<string>('')
	const [max_seats, setMaxSeats] = useState<number>(0)
	const [departure_location, setDepartureLocation] = useState<string>('')
	const [arrival_location, setArrivalLocation] = useState<string>('')
	const [return_location, setReturnLocation] = useState<string>('')
	const [return_arrival_location, setReturnArrivalLocation] =
		useState<string>('')
	const [departure_date, setDepartureDate] = useState<string>('')
	const [arrival_date, setArrivalDate] = useState<string>('')
	const [return_date, setReturnDate] = useState<string>('')
	const [return_arrival_date, setReturnArrivalDate] = useState<string>('')
	const navigate = useNavigate()

	///change methods
	const changeDepartureLocation = (event: SelectChangeEvent) => {
		setDepartureLocation(event.target.value)
		console.log(event.target.value)
	}

	const changeArrivalLocation = (event: SelectChangeEvent) => {
		setArrivalLocation(event.target.value)
	}

	const changeReturnLocation = (event: SelectChangeEvent) => {
		setReturnLocation(event.target.value)
	}
	const changeReturnArrivalLocation = (event: SelectChangeEvent) => {
		setReturnArrivalLocation(event.target.value)
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
		const requestBody: ICycleInterface = {
			name,
			programId,
			max_seats,
			departure_location,
			arrival_location,
			return_arrival_location,
			return_location,
			arrival_date,
			return_date,
			departure_date,
			return_arrival_date,
		}
		if (!isDisabled()) {
			try {
				const response: IResponseInterface<ICycleInterface> =
					await api<ICycleInterface>({
						url: '/cycles/create',
						method: 'POST',
						body: JSON.stringify(requestBody),
					})

				if (response.success) {
					if (response.data) {
						navigate('/cycle/list')
					}
				}
			} catch (error: any) {
				console.log(error)
			}
		} else {
			alert('validation error')
		}
	}
	const isDisabled = (): boolean => {
		return (
			name === '' ||
			max_seats === 0 ||
			departure_location === '' ||
			arrival_location === '' ||
			return_location === '' ||
			return_arrival_location === '' ||
			departure_date === '' ||
			arrival_date === '' ||
			return_date === '' ||
			return_arrival_date === ''
		)
	}
	return (
		<div className="createContainer">
			<form onSubmit={sendData}>
				<div className="TopCycle">
					<h1>Create Cycle</h1>
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
								<LocalizationProvider dateAdapter={AdapterLuxon}>
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

								<LocalizationProvider dateAdapter={AdapterLuxon}>
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

								<LocalizationProvider dateAdapter={AdapterLuxon}>
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

								<LocalizationProvider dateAdapter={AdapterLuxon}>
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
								<CustomInputField
									type={'text'}
									label={'Departure Location'}
									value={departure_location}
									setValue={setDepartureLocation}
								/>
							</Grid>

							<Grid item xs={8}>
								<CustomInputField
									type={'text'}
									label={'Return Location'}
									value={return_location}
									setValue={setReturnLocation}
								/>
							</Grid>

							<Grid item xs={8}>
								<CustomInputField
									type={'text'}
									label={'Arrival Location'}
									value={arrival_location}
									setValue={setArrivalLocation}
								/>
							</Grid>

							<Grid item xs={8}>
								<CustomInputField
									type={'text'}
									label={'Return Arrival Location'}
									value={return_arrival_location}
									setValue={setReturnArrivalLocation}
								/>
							</Grid>

							<Grid item xs={8}>
								<NavLink to={`/cycle/list`}>
									{' '}
									<Button className="createButton" variant="contained">
										Back
									</Button>
								</NavLink>

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

export default CreateCycleComponent