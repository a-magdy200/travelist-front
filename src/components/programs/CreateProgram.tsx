import { useState } from 'react'
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
import CustomInputField from '../Form/CustomInputField'
import api from '../../config/api'
import { IResponseInterface } from '../../config/interfaces/IResponse.interface'
import { IProgramInterface } from '../../config/interfaces/IProgram.interface'
import { NavLink, useNavigate } from 'react-router-dom'

const CreateProgramComponent = () => {
	const [name, setName] = useState<string>('')
	const [description, setDescription] = useState<string>('')
	const [price, setPrice] = useState<string>('')
	const [is_Recurring, setis_Recurring] = useState(true)
	const [companyId, setCompanyId] = useState<string>('1')
	const [countryId, setCountryId] = useState<string>('')
	const [transportationId, setTransportationId] = useState<string>('1')
	const [hotel, setHotel] = React.useState<string[]>([])
	const [destination, setDestination] = useState<string[]>([])
	const [cover_picture, setCoverPicture] = useState<File>()
	const navigate = useNavigate()
	const hotels = [
		{ id: 1, value: 'h1' },
		{ id: 2, value: 'h2' },
	]

	const countries = [
		{ id: 1, value: 'c1' },
		{ id: 2, value: 'c2' },
	]

	/// styling
	const theme2 = useTheme()

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
	}
	const changeDepartureCountry = (event: SelectChangeEvent) => {
		setCountryId(event.target.value)
	}
	const changeHotel = (event: SelectChangeEvent<typeof hotel>) => {
		const {
			target: { value },
		} = event
		setHotel(typeof value === 'string' ? value.split(',') : value)
	}

	const changeDestination = (event: SelectChangeEvent<typeof destination>) => {
		const {
			target: { value },
		} = event
		setDestination(typeof value === 'string' ? value.split(',') : value)
	}

	const isDisabled = (): boolean => {
		console.log(
			name,
			description,
			price,
			companyId,
			hotels.length,
			destination.length,
			countryId,
			companyId
		)
		return (
			name === '' ||
			description === '' ||
			price === '' ||
			companyId === '' ||
			hotels.length === 0 ||
			destination.length === 0 ||
			countryId === ''
		)
	}

	async function sendData(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const formData = new FormData()

		formData.append('name', name)
		formData.append('description', description)
		if (cover_picture) {
			formData.append('cover_picture', cover_picture)
		}
		formData.append('price', price)
		formData.append('is_Recurring', is_Recurring ? '1' : '0')
		formData.append('companyId', '1')
		formData.append('transportationId', '1')
		formData.append('countryId', countryId)
		for (let item of hotel) {
			formData.append('hotels', item.toString())
			console.log(item)
		}
		for (let item of destination) {
			formData.append('destinations', item.toString())
			console.log(item)
		}
		if (!isDisabled()) {
			const response: IResponseInterface<IProgramInterface> =
				await api<IProgramInterface>({
					url: '/programs/create',
					method: 'POST',
					body: formData,
				})
			console.log(response)

			navigate('/program/list')
		} else {
			alert('error in validation')
		}
	}

	return (
		<div className="createContainer">
			<form onSubmit={sendData}>
				<div className="Top">
					<h1>Create Program</h1>
					<TextField
						className="inputText"
						label="Program Name"
						variant="outlined"
						required
						value={name}
						onChange={(e) => {
							setName(e.target.value)
							console.log(e.target.value)
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
							<CustomInputField
								type={'number'}
								label={'Program Price'}
								value={price}
								setValue={setPrice}
							/>
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
										console.log(e.target.value)
									}}
								/>
								<br />
							</Grid>
							<Grid item xs={8}>
								<FormControl sx={{ m: 1, width: 300 }}>
									<InputLabel id="demo-multiple-hotel-label">Hotels</InputLabel>
									<Select
										labelId="demo-multiple-hotel-label"
										id="demo-multiple-hotel"
										multiple
										value={hotel}
										onChange={changeHotel}
										input={
											<OutlinedInput id="select-multiple-chip" label="Chip" />
										}
										renderValue={(selected) => (
											<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
												{selected.map((value) => (
													<Chip key={value} label={value} />
												))}
											</Box>
										)}
										MenuProps={MenuProps}
									>
										{hotels.map((hotelItem) => (
											<MenuItem
												key={hotelItem.id}
												value={hotelItem.id}
												style={getStyles(hotelItem.value, hotel, theme2)}
											>
												{hotelItem.value}
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
											Departure Location
										</InputLabel>
										<Select
											labelId="demo-simple-select-label"
											id="demo-simple-select"
											value={countryId?.toString()}
											label="Arrival Location"
											onChange={changeDepartureCountry}
										>
											<MenuItem value={1}>Egypt</MenuItem>
											<MenuItem value={2}>London</MenuItem>
											<MenuItem value={3}>Japan</MenuItem>
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
										labelId="demo-multiple-destination-label"
										id="demo-multiple-destination"
										multiple
										value={destination}
										onChange={changeDestination}
										input={
											<OutlinedInput id="select-multiple-chip" label="Chip" />
										}
										renderValue={(selected) => (
											<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
												{selected.map((value) => (
													<Chip key={value} label={value} />
												))}
											</Box>
										)}
										MenuProps={MenuProps}
									>
										{countries.map((destinationItem) => (
											<MenuItem
												key={destinationItem.id}
												value={destinationItem.id}
												style={getStyles(
													destinationItem.value,
													destination,
													theme2
												)}
											>
												{destinationItem.value}
											</MenuItem>
										))}
									</Select>
								</FormControl>
								<br />
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

export default CreateProgramComponent
