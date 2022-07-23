import { useState } from 'react'
import Button from '@mui/material/Button'
import { Box } from '@mui/system'
import CustomInputField from '../../components/Form/CustomInputField'
import { useNavigate, useParams } from 'react-router-dom'
import { IResetPasswordRequestBody } from '../../config/interfaces/IResetPasswordRequestBody.interface'
import api from '../../config/api'
import { IForgetPasswordResponse } from '../../config/interfaces/IForgetPasswordResponse.interface'
import { toast } from 'react-toastify'
import Loader from '../../components/Loader'
import DisplayErrorsList from '../../components/DisplayErrors/DisplayErrorsList'

function ResetPassword() {
	const [password, set_password] = useState('')
	const [confirm_password, set_confirm_password] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [errors, setErrors] = useState([])
	const navigate = useNavigate()
	const { token } = useParams()

	async function sendData(e: any) {
		e.preventDefault()
		toast.info('Reset Password....')
		setErrors([])
		setIsLoading(true)
		let checkSubmit = true

		if (password !== confirm_password) {
			checkSubmit = false
		}

		if (checkSubmit) {
			try {
				const requestBody: IResetPasswordRequestBody = {
					password,
					token,
				}

				const response: IForgetPasswordResponse = await api({
					url: `/auth/reset_password`,
					method: 'POST',
					body: JSON.stringify(requestBody),
				})

				if (response.success) {
					navigate('/login')
				}
				toast.success('Reset password is successfully done')
			} catch (error: any) {
				setErrors(error?.response?.data?.errors || [])
				toast.error('An error has occurred')
			}
		}
		setIsLoading(false)
	}
	if (isLoading) {
		return <Loader />
	}
	return (
		<div className="container">
			<h3>Reset Password</h3>
			<Box sx={{ m: 3 }}>
				<form onSubmit={sendData}>
					<DisplayErrorsList errors={errors} />
					<div>
						<CustomInputField
							type={'password'}
							label={'Password'}
							value={password}
							setValue={set_password}
						/>
					</div>
					<br />

					<div>
						<CustomInputField
							type={'password'}
							label={'Confirm Password'}
							value={confirm_password}
							setValue={set_confirm_password}
						/>
					</div>
					<br />

					<Button variant="contained" type="submit">
						Reset Password
					</Button>
				</form>
			</Box>
		</div>
	)
}

export default ResetPassword
