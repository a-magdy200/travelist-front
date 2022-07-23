import { useState, useEffect } from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField/TextField'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import { IResponseInterface } from '../../config/interfaces/IResponse.interface'
import { IUserRequestBodyInterface } from '../../config/interfaces/IUserRequestBody.interface'
import { useContext } from 'react'
import AuthContext from '../../contexts/AuthContext'
import api from '../../config/api'
import { toast } from 'react-toastify'
const EditUser = () => {
	const [name, setName] = useState<string>('')
	const [email, setEmail] = useState('')
	const [address, setAddress] = useState('')
	const navigate = useNavigate()
	const [userDetails, setUserDetails] = useState<IUserRequestBodyInterface>()
	const LoggedInUser: any = useContext(AuthContext)
	const getUserProfileData = async () => {
		try {
			const response: IResponseInterface<IUserRequestBodyInterface> =
				await api<IUserRequestBodyInterface>({
					url: `/api/users/`,
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
	}, [])
	async function sendData(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
    	const requestBody = {
			name,
			email,
			address,
		}

		try {
			const response: IResponseInterface<IUserRequestBodyInterface> =
				await api<IUserRequestBodyInterface>({
					url: `/api/users/`,
					method: 'PUT',
					body: JSON.stringify(requestBody),
				})

			if (response.success) {
				navigate(`/${LoggedInUser.user.type}`)
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
									value={email}
									size="small"
									onChange={(e) => {
										setEmail(e.target.value)
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
									id="address"
									label="address"
									size="small"
									value={address}
									onChange={(e) => {
										setAddress(e.target.value)
									}}
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
