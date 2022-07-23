import { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { SelectChangeEvent } from '@mui/material/Select'
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
import { toast } from 'react-toastify'
import DisplayErrorsList from '../DisplayErrors/DisplayErrorsList'

const EditCycleComponent = () => {
	const { id } = useParams()
	const [name, setName] = useState<string>('')
	const [max_seats, setMaxSeats] = useState<number>(0)
	const [programId, setProgramId] = useState<number>(0)
	const [departure_location, setDepartureLocation] = useState<string>('')
	const [arrival_location, setArrivalLocation] = useState<string>('')
	const [return_location, setReturnLocation] = useState<string>('')
	const [return_arrival_location, setReturnArrivalLocation] =
		useState<string>('')
	const [departure_date, setDepartureDate] = useState<string>('')
	const [arrival_date, setArrivalDate] = useState<string>('')
	const [return_date, setReturnDate] = useState<string>('')
	const [return_arrival_date, setReturnArrivalDate] = useState<string>('')
	const [cycle, setCycle] = useState<ICycleInterface>()
	const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);
 
	const navigate = useNavigate()

	const getCycle = async () => {
		
		try {
			const response: IResponseInterface<ICycleInterface> =
				await api<ICycleInterface>({
					url: `/api/cycles/show/${id}`,
				})

			if (response.success) {
				if (response.data) {
					setCycle(response.data)
					setName(response.data.name)
					if (response.data.program) {
						setProgramId(response.data.program.id)
					}
					setMaxSeats(response.data.max_seats)
					setDepartureLocation(response.data.departure_location)
					setArrivalLocation(response.data.arrival_location)
					setReturnLocation(response.data.return_location)
					setReturnArrivalLocation(response.data.return_arrival_location)
					setDepartureDate(formatDate(response.data.departure_date))
					setArrivalDate(formatDate(response.data.arrival_date))
					setReturnDate(formatDate(response.data.return_date))
					setReturnArrivalDate(formatDate(response.data.return_arrival_date))
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
		toast.info("Editing Cycle....");
		setErrors([]);
		setIsLoading(true);
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
				console.log(departure_date)
				const response: IResponseInterface<ICycleInterface> =
					await api<ICycleInterface>({
						url: `/api/cycles/update/${id}`,
						method: 'PUT',
						body: JSON.stringify(requestBody),
					})

				if (response.success) {
					if (response.data) {
						setCycle(response.data)
						navigate('/cycle/list')
					}
				}
				toast.success("Edited Successfully");
	
			} catch (error: any) {
				setErrors(error?.response?.data?.errors || []);
				toast.error("An error has occurred");
		  
			}

		} else {
			toast.error("An error has occurred");
		}
		setIsLoading(false);

	}
	const isDisabled = (): boolean => {
		console.log(
			name,
			max_seats,
			departure_location,
			arrival_location,
			return_location,
			return_arrival_location,
			departure_date,
			arrival_date,
			return_date,
			return_arrival_date
		)
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
					<h1>Edit Cycle</h1>
					<Grid container direction="column" spacing={2}>
					<DisplayErrorsList errors={errors} />
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
												console.log(departure_date)
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
												console.log(arrival_date)
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
									Edit
								</Button>
							</Grid>
						</Grid>
					</div>
				</div>
			</form>
		</div>
	)
}

export default EditCycleComponent
