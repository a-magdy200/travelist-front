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

let EditProgramComponent = () => {
	let { id } = useParams()
	const [name, setName] = useState<string>('')
	const [description, setDescription] = useState<string>('')
	const [price, setPrice] = useState<string>('')
	const [is_Recurring, setis_Recurring] = useState(true)
	const [companyId, setcompanyId] = useState<number>(1)
	const [hotel, setHotel] = React.useState<string[]>([])
	const [cover_picture, setCoverPicture] = React.useState<File>()
	const [program, setProgram] = React.useState<IProgramInterface>()
	const navigate = useNavigate()

	interface Hotel {
		id: number
		name: string
	}
	const hotels = [
		{ id: 1, value: 'h1' },
		{ id: 2, value: 'h2' },
	]

	const getProgram = async () => {
		try {
			const response: IResponseInterface<IProgramInterface> =
				await api<IProgramInterface>({
					url: `/programs/show/${id}`,
				})

			if (response.success) {
				if (response.data) {
					setProgram(response.data)
					setName(response.data.name)
					setDescription(response.data.description)
					setPrice(response.data.price.toString())
					setis_Recurring(response.data.is_Recurring)
					//setHotel(response.data.hotels.map((h: Hotel) => h.id));
					console.log('res', response.data)
					console.log('program', program)
				}
			}
		} catch (error: any) {
			console.log(error)
		}
	}
	useEffect(() => {
		getProgram()
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

	const changeHotel = (event: SelectChangeEvent<typeof hotel>) => {
		console.log(event.target.value)
		const {
			target: { value },
		} = event
		setHotel(typeof value === 'string' ? value.split(',') : value)
	}

	async function sendData(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const formData = new FormData()
		if (!isDisabled) {
			formData.append('name', name)
			formData.append('description', description)
			if (cover_picture) {
				formData.append('cover_picture', cover_picture)
			}
			formData.append('price', price)
			for (let item of hotel) {
				formData.append('hotels', item)
				console.log(item)
			}
			console.log(formData)

			const response: IResponseInterface<IProgramInterface> =
				await api<IProgramInterface>({
					url: `/programs/update/${id}`,
					method: 'PUT',
					body: formData,
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				})
			navigate('/program/list')
		} else {
			alert('error validation')
		}
	}
	const isDisabled = (): boolean => {
		return (
			name === '' ||
			description === '' ||
			price === '' ||
			companyId === 0 ||
			hotels.length === 0
		)
	}
	return (
		<div className="createContainer">
			<form onSubmit={sendData}>
				<div className="Top">
					<h1>Edit Program</h1>
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
