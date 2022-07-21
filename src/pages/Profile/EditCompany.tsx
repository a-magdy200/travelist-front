import { useState } from 'react'
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
import ProfilePictureChanger from '../../components/Profile/ProfilePictureChanger'

import { useNavigate } from 'react-router-dom'

const EditCompany = () => {
	const [description, setDescription] = useState('')
	const navigate = useNavigate()

	async function sendData(e: any) {
		e.preventDefault()
		let checkSubmit = true
		if (checkSubmit) {
			try {
				const response = await fetch('http://localhost:4000/', {
					method: 'POST',
					headers: { 'content-Type': 'application/json' },
					body: JSON.stringify({ description }),
				})

				if (response.ok) {
					console.log(response.status)
					console.log('done')

					// navigate('/profile',);
				}
			} catch (error) {
				console.log(error)
			}
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
				<Card sx={{ maxWidth: 700 }} style={{ minHeight: '150vh' }}>
					<form onSubmit={sendData}>
						<CardContent>
							<h2>Edit Details</h2>
							<ProfilePictureChanger />
							<div>
								<TextField
									id="outlined-multiline-flexible"
									label="Description"
									size="small"
									multiline
									fullWidth
									maxRows={4}
									onChange={(e) => {
										setDescription(e.target.value)
									}}
								/>
							</div>
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

export default EditCompany
