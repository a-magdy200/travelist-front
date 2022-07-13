import { useState } from 'react'
import Button from '@mui/material/Button'
import { Box } from '@mui/system'
import CustomInputField from '../../components/Form/CustomInputField'
import { IForgetPasswordRequest } from '../../config/interfaces/IForgetPasswordRequest.interface'
import { IForgetPasswordResponse } from '../../config/interfaces/IForgetPasswordResponse.interface'
import api from '../../config/api'

function ForgetPassword() {
	const [email, setEmail] = useState('')

	async function sendData(e: any) {
		e.preventDefault()

		try {
			const requestBody: IForgetPasswordRequest = {
				email,
			}

			const response: IForgetPasswordResponse = await api({
				url: '/auth/forget_password',
				method: 'POST',
				body: JSON.stringify(requestBody),
			})

			if (response.success) {
				console.log('check your mail, verification code has been sent')
			}
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className="container">
			<h3>Forget your Password?</h3>
			{/* <p>
				We will send you mail with verification code to reset your password and
				activate your account, please write your mail and check it the get the
				code
			</p> */}
			<Box sx={{ m: 3 }}>
				<form onSubmit={sendData}>
					<div>
						<CustomInputField
							type={'email'}
							label={'Email'}
							value={email}
							setValue={setEmail}
						/>
					</div>
					<br />
					<Button variant="contained" type="submit">
						Send
					</Button>
				</form>
			</Box>
		</div>
	)
}

export default ForgetPassword
