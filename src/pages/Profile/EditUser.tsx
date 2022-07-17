import { useState, useEffect } from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField/TextField'
import Button from '@mui/material/Button'
import Radio from '@mui/material/Radio'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import RadioGroup from '@mui/material/RadioGroup/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { IResponseInterface } from '../../config/interfaces/IResponse.interface'
import { IUserRequestBodyInterface } from '../../config/interfaces/IUserRequestBody.interface'
import { useParams } from 'react-router-dom'
import { IUserInterface } from '../../config/interfaces/IUser.interface'

import api from '../../config/api'
import ProfilePictureChanger from '../../components/Profile/ProfilePictureChanger'

const EditUser = () => {
	const [name, setName] = useState<string>('')
	const [email, setEmail] = useState('')
	const [address, setAddress] = useState('')
	const [gender, setGender] = useState('')
	const [nationalId, setNationalId] = useState('')
	const [isGuide, setIsGuide] = useState(false)
	const [dateOfBirth, setDateOfBirth] = useState('')
	const [userDetails, setUserDetails] = useState<IUserRequestBodyInterface>()
	const { id } = useParams()
	const getUserProfileData = async () => {
		try {
			const response: IResponseInterface<IUserRequestBodyInterface> =
				await api<IUserRequestBodyInterface>({
					url: `/api/users/`,
					method: 'GET',
				})

			if (response.success) {
				if (response.data) {
					setUserDetails(response.data)
					setName(response.data.name)
					setAddress(response.data.address)
					setEmail(response.data.email)
				}
			}
		} catch (error: any) {
			console.log(error)
		}
	}
	useEffect(() => {
		getUserProfileData()
		if (userDetails) {
		}
	}, [])
	console.log('user details', userDetails)
	async function sendData(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
    const requestBody ={
      name,
      email,
      address
    }
    console.log(requestBody)

			try {
				const response: IResponseInterface<IUserRequestBodyInterface> =
					await api<IUserRequestBodyInterface>({
						url: `/api/users/`,
						method: 'PUT',
            body: JSON.stringify(requestBody),

					})

				if (response.success) {
					if (response.data) {
						setUserDetails(response.data)
						//	navigate('/')
					}
				}
			} catch (error: any) {
				console.log(error)
			}

	}
	return (
		<div
			className="container"
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<div className="left">
				<Card sx={{ maxWidth: 700 }} style={{ minHeight: '100vh' }}>
					<form onSubmit={sendData}>
						<CardContent>
							<h2>Edit Basic Info</h2>
							{/* <ProfilePictureChanger /> */}
							<div>
								<TextField
									className="inputText"
									variant="outlined"
									required
									fullWidth
									id="name"
									label="username"
									value={name}
									size="small"
									onChange={(e) => {
										setName(e.target.value)
									}}
								/>
							</div>
							<br />

							<div>
								<TextField
									className="inputText"
									variant="outlined"
									required
									fullWidth
									id="email"
									type="email"
									label="email"
									onChange={(e) => {
										setEmail(e.target.value)
									}}
									value={email}
									size="small"
								/>
							</div>
							<br />
							<div>
								<TextField
									className="inputText"
									variant="outlined"
									required
									fullWidth
									id="address"
									label="address"
									size="small"
									value={address}
								/>
							</div>
							<br />
						</CardContent>

						<CardActions>
							<Button variant="contained" type="submit">
								Save Changes
							</Button>
						</CardActions>
					</form>
				</Card>
			</div>
		</div>
	)
}
export default EditUser
