import { useState } from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField/TextField'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

import { useNavigate } from 'react-router-dom'
const EditPassword = () => {
	const [password, setPass] = useState('')
	const [confirmPassword, setPassConfirm] = useState('')

	async function sendData(e: any) {
		e.preventDefault()
		let checkSubmit = true

		if (password !== confirmPassword) {
			checkSubmit = false
		}

		if (checkSubmit) {
			try {
				const response = await fetch('http://localhost:4000/', {
					method: 'PUT',
					headers: { 'content-Type': 'application/json' },
					body: JSON.stringify({ password }),
				})

				if (response.ok) {
					console.log(response.status)
					console.log('done')
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
			<div className="center">
				<Card sx={{ maxWidth: 700 }} style={{ minHeight: '75vh' }}>
					<form onSubmit={sendData}>
						<CardContent>
							<h2>Change Password</h2>
							<div>
								<TextField
									required
									fullWidth
									id="password"
									type="password"
									label="current password"
									onChange={(e) => {
										setPass(e.target.value)
									}}
								/>
							</div>
							<br />

							<div>
								<TextField
									required
									fullWidth
									id="password"
									type="password"
									label="new password"
									onChange={(e) => {
										setPass(e.target.value)
									}}
								/>
							</div>
							<br />

							<div>
								<TextField
									required
									fullWidth
									id="password"
									type="password"
									label="confirm password"
									onChange={(e) => {
										setPass(e.target.value)
									}}
								/>
							</div>
							<br />
						</CardContent>
						<CardActions>
							<Button variant="contained" size="large">
								Update Password
							</Button>
							<br />
							<Button variant="outlined" size="large">
								Cancel
							</Button>
						</CardActions>
					</form>
				</Card>
			</div>
		</div>
	)
}
export default EditPassword
