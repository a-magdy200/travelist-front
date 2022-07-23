import { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import TextareaAutosize from '@mui/material/TextareaAutosize'
import Checkbox from '@mui/material/Checkbox'
import { Theme, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Chip from '@mui/material/Chip'
import React from 'react'
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import api from '../../config/api'
import { IProgramInterface } from '../../config/interfaces/IProgram.interface'
import { IResponseInterface } from '../../config/interfaces/IResponse.interface'
import { IHotelInterface } from '../../config/interfaces/IHotel.interface'
import { ICountryInterface } from '../../config/interfaces/ICountry.interface'
import { ITransportationInterface } from '../../config/interfaces/ITransportation.interface'
import { toast } from 'react-toastify'
import Loader from '../Loader'
import DisplayErrorsList from '../DisplayErrors/DisplayErrorsList'

const EditProgramComponent = () => {
	let { id } = useParams()
	const [name, setName] = useState<string>('')
	const [description, setDescription] = useState<string>('')
	const [price, setPrice] = useState<string>('')
	const [is_Recurring, setis_Recurring] = useState(true)
	const [countryId, setCountryId] = useState<string>('')
	const [hotels, setHotels] = useState<IHotelInterface[]>([])
	const [filteredHotels, setFilteredHotels] = React.useState<IHotelInterface[]>(
		[]
	)
	const [countries, setCountries] = React.useState<ICountryInterface[]>([])
	const [selectedHotels, setSelectedHotels] = React.useState<number[]>([])
	const [destination, setDestination] = useState<ICountryInterface[]>([])
	const [selectedDestination, setSelectedDestination] = useState<number[]>([])
	const [transportationId, setTransportationId] = useState<string>('')
	const [transportations, setTransportations] = useState<
		ITransportationInterface[]
	>([])
	const [cover_picture, setCoverPicture] = useState<File>()
	const [program, setProgram] = useState<IProgramInterface>()
	const [isLoading, setIsLoading] = useState(false);
	const [errors, setErrors] = useState([]);
   
	const navigate = useNavigate()
	const getProgram = async () => {
		
		try {
			const response: IResponseInterface<IProgramInterface> =
				await api<IProgramInterface>({
					url: `/api/programs/show/${id}`,
				})

			if (response.success) {
				if (response.data) {
					console.log(response.data)
					setProgram(response.data)
					setName(response.data.name)
					setDescription(response.data.description)
					setPrice(response.data.price.toString())
					setis_Recurring(response.data.is_Recurring)
					setCountryId(response.data.country.id.toString())
					setTransportationId(response.data.transportation.id.toString())
					setSelectedHotels(
						response.data.hotels.map((hotel: IHotelInterface) => hotel.id)
					)
					setSelectedDestination(
						response.data.destinations.map(
							(destination: ICountryInterface) => destination.id
						)
					)
					console.log('res', response.data)
					console.log('program', program)
				}
			}
		} catch (error: any) {
			console.log(error)
		}
	}
	const getHotels = async () => {
		try {
			const response: IResponseInterface<IHotelInterface[]> = await api<
				IHotelInterface[]
			>({
				url: '/api/admin/hotels',
			})

			if (response.success) {
				if (response.data) {
					setHotels(response.data)
				}
			}
		} catch (error: any) {
			console.log(error)
		}
	}
	const getCountries = async () => {
		try {
			const response: IResponseInterface<ICountryInterface[]> = await api<
				ICountryInterface[]
			>({
				url: '/api/admin/countries',
			})

			if (response.success) {
				if (response.data) {
					setCountries(response.data)
				}
			}
		} catch (error: any) {
			console.log(error)
		}
	}
	const getTransportations = async () => {
		try {
			const response: IResponseInterface<ITransportationInterface[]> =
				await api<ITransportationInterface[]>({
					url: '/api/admin/transportations',
				})

			if (response.success) {
				if (response.data) {
					setTransportations(response.data)
				}
			}
		} catch (error: any) {
			console.log(error)
		}
	}
	useEffect(() => {
		getProgram()
		getHotels()
		getCountries()
		getTransportations()
	}, [])

	/// styling
	const theme2 = useTheme()
	const Item = styled(Paper)(({ theme }) => ({
		backgroundColor: theme.palette.mode === 'dark' ? '#fff' : '#e8eef7',
		padding: theme.spacing(1),
		color: theme.palette.text.secondary,
	}))

	const ITEM_HEIGHT = 48
	const ITEM_PADDING_TOP = 8
	const MenuProps = {
		PaperProps: {
			style: {
				maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
				width: 250,
			},
		},
	}

	function getStyles(
		name: string,
		personName: readonly string[],
		theme: Theme
	) {
		return {
			fontWeight:
				personName.indexOf(name) === -1
					? theme.typography.fontWeightRegular
					: theme.typography.fontWeightMedium,
		}
	}

	///change methods

	const changeRecurring = (e: React.ChangeEvent<HTMLInputElement>) => {
		setis_Recurring(!is_Recurring)
		console.log(is_Recurring)
	}
	const changeHotel = (e: SelectChangeEvent<number[]>) => {
		setSelectedHotels(e.target.value as number[])
		console.log(e.target.value as number[])
	}

	const changeDepartureCountry = (event: SelectChangeEvent) => {
		setCountryId(event.target.value)
	}
	const changeTransportation = (event: SelectChangeEvent) => {
		setTransportationId(event.target.value)
	}
	const changeDestination = (e: SelectChangeEvent<number[]>) => {
		const newDestinations = e.target.value as number[]
		setSelectedDestination(newDestinations)
		setFilteredHotels(
			hotels.filter(
				(hotelItem) => newDestinations.indexOf(hotelItem?.countryId || 0) !== -1
			)
		)
	}
	async function sendData(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		toast.info("Editing Program....");
		setErrors([]);
		setIsLoading(true);
		const formData = new FormData()

		formData.append('name', name)
		formData.append('description', description)
		if (cover_picture) {
			formData.append('cover_picture', cover_picture)
		}
		formData.append('price', price)
		formData.append('is_Recurring', is_Recurring ? '1' : '0')
		formData.append('transportationId', transportationId)
		formData.append('countryId', countryId)
		for (let item of selectedHotels) {
			formData.append('hotels', item.toString())
			console.log('items', item)
		}
		for (let item of selectedDestination) {
			formData.append('destinations', item.toString())
			console.log(item)
		}
		console.log(formData)
		if (!isDisabled()) {
			try{
			const response: IResponseInterface<IProgramInterface> =
				await api<IProgramInterface>({
					url: `/api/programs/update/${id}`,
					method: 'PUT',
					body: formData,
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				})
				if (response.success) {
					if (response.data) {
						navigate('/program/list')
					}
					toast.success("Editing Successfully");
				  }
				}
				catch(error:any)
				  {
					setErrors(error?.response?.data?.errors || []);
					toast.error("An error has occurred");
					console.log(error)
			   
				  }
			
		} else {
			toast.error("Validation Error");
		}
		setIsLoading(false);

	}
	const isDisabled = (): boolean => {
		console.log(
			name,
			description,
			price,
			hotels.length,
			selectedDestination.length,
			countryId
		)
		return (
			name === '' ||
			description === '' ||
			price === '' ||
			hotels.length === 0 ||
			selectedDestination.length === 0 ||
			countryId === ''
		)
	}
	if (isLoading) {
		return <Loader/>
	  }
	return (
		<div className="createContainer">
			<form onSubmit={sendData}>
				<div className="Top">
					<h1>Edit Program</h1>
					<DisplayErrorsList errors={errors} />

					<TextField
						className="inputText"
						label="Program Name"
						variant="outlined"
						required
						value={name}
						onChange={(e) => {
							setName(e.target.value)
						}}
					/>{' '}
					<br />
				</div>
				<div className="bottom">
					<div className="bottomHeader">
						<h2>Program Details</h2>
					</div>
					<hr />
					<div className="bottomContent">
						<Grid container direction="column" spacing={2}>
							<Grid item xs={8}>
								<TextField
									className="inputText"
									type="number"
									label="Program Price"
									variant="outlined"
									required
									value={price}
									onChange={(e) => {
										setPrice(e.target.value)
									}}
								/>{' '}
								<br />
							</Grid>
							<Grid item xs={8}>
								<TextareaAutosize
									aria-label="Description"
									minRows={3}
									placeholder="Description"
									style={{ width: 400 }}
									required
									value={description}
									onChange={(e) => {
										setDescription(e.target.value)
									}}
								/>
								<br />
							</Grid>
							<Grid item xs={8}>
								<Box sx={{ minWidth: 120 }}>
									<FormControl sx={{ m: 1, width: 300 }}>
										<InputLabel id="demo-simple-select-label">
											Departure Location
										</InputLabel>
										<Select
											labelId="demo-simple-select-label"
											id="demo-simple-select"
											value={countryId?.toString()}
											label="Departure Location"
											onChange={changeDepartureCountry}
										>
											{countries.map((destinationItem) => (
												<MenuItem value={destinationItem.id}>
													{destinationItem.name}
												</MenuItem>
											))}
										</Select>
									</FormControl>
								</Box>
							</Grid>
							<Grid item xs={8}>
								<FormControl sx={{ m: 1, width: 300 }}>
									<InputLabel id="demo-multiple-destination-label">
										Destinations
									</InputLabel>
									<Select
										labelId="demo-multiple-country-label"
										id="demo-multiple-country"
										multiple
										value={selectedDestination}
										onChange={changeDestination}
										input={
											<OutlinedInput id="select-multiple-chip" label="Chip" />
										}
										renderValue={(selected) => (
											<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
												{selectedDestination.map((destinationId: number) => {
													const destination = countries.find(
														(item) => item.id === destinationId
													)
													return (
														<Chip
															key={destinationId}
															label={destination?.name}
														/>
													)
												})}
											</Box>
										)}
										MenuProps={MenuProps}
									>
										{countries.map((country) => (
											<MenuItem key={country.id} value={country.id}>
												{country.name}
											</MenuItem>
										))}
									</Select>
								</FormControl>
								<br />
							</Grid>

							<Grid item xs={8}>
								<FormControl sx={{ m: 1, width: 300 }}>
									<InputLabel id="demo-multiple-hotel-label">Hotels</InputLabel>
									<Select
										labelId="demo-multiple-hotel-label"
										id="demo-multiple-hotel"
										multiple
										value={selectedHotels}
										onChange={changeHotel}
										input={
											<OutlinedInput id="select-multiple-chip" label="Chip" />
										}
										renderValue={(selected) => (
											<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
												{selectedHotels.map((hotelId: number) => {
													const hotel = hotels.find(
														(item) => item.id === hotelId
													)
													return <Chip key={hotelId} label={hotel?.name} />
												})}
											</Box>
										)}
										MenuProps={MenuProps}
									>
										{filteredHotels.map((hotel) => (
											<MenuItem key={hotel.id} value={hotel.id}>
												{hotel.name}
											</MenuItem>
										))}
									</Select>
								</FormControl>
								<br />
							</Grid>
							<Grid item xs={8}>
								<Box sx={{ minWidth: 120 }}>
									<FormControl sx={{ m: 1, width: 300 }}>
										<InputLabel id="demo-simple-select-label">
											Transportations
										</InputLabel>
										<Select
											labelId="demo-simple-select-label"
											id="demo-simple-select"
											value={transportationId?.toString()}
											label="Arrival Location"
											onChange={changeTransportation}
										>
											{transportations.map((transportationItem) => (
												<MenuItem value={transportationItem.id}>
													{transportationItem.name}
												</MenuItem>
											))}
										</Select>
									</FormControl>
								</Box>
							</Grid>

							<Grid item xs={8}>
								<Checkbox
									checked={is_Recurring}
									onChange={changeRecurring}
									inputProps={{ 'aria-label': 'controlled' }}
								/>
								is_Recurring
							</Grid>
							<Grid item xs={2}>
								<Button variant="contained" component="label">
									<input
										name="cover_picture"
										type="file"
										accept="image/*"
										onChange={(e) => {
											if (e.target.files) {
												setCoverPicture(e.target.files[0])
											}
										}}
									/>
								</Button>
							</Grid>
							<Grid item xs={8}>
								<NavLink to={`/program/list`}>
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

export default EditProgramComponent
