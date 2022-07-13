import { useState } from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField/TextField'
import Radio from '@mui/material/Radio'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import RadioGroup from '@mui/material/RadioGroup/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import api from '../../config/api'
import { ITravelerRegisterRequestBody } from '../../config/interfaces/ITravelerRegisterRequestBody'
import { UserType } from '../../config/types/user.type'
import { GenderType } from '../../config/types/gender.type'
import { IResponseInterface } from '../../config/interfaces/IResponse.interface'
import { IUserAuthenticationResponse } from '../../config/interfaces/IUserAuthenticationResponse.interface'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import useAuth from '../../hooks/useAuth'
import { ICompanyRegisterRequestBody } from '../../config/interfaces/ICompanyRegisterRequestBody'
import CustomInputField from '../../components/Form/CustomInputField'
import { formatDate } from '../../config/helpers/formatDateFunction'
import { LoadingButton } from '@mui/lab'

function Register() {
	const [name, set_name] = useState('')
	const [email, set_email] = useState('')
	const [password, set_password] = useState('')
	const [confirm_password, set_confirm_password] = useState('')
	const [address, set_address] = useState('')
	const [type, set_type] = useState<UserType>('traveler')
	const [gender, set_gender] = useState<GenderType>('male')
	const [national_id, set_national_id] = useState('')
	const [is_guide, set_is_guide] = useState(false)
	const [date_of_birth, set_date_of_birth] = useState('')
	const [description, set_description] = useState('')
	const { login } = useAuth()
	const [isLoading, setIsLoading] = useState(false)

	async function sendData(e: any) {
		e.preventDefault()
		setIsLoading(true)
		let checkSubmit = true

		if (password !== confirm_password) {
			checkSubmit = false
		}

		if (checkSubmit) {
			try {
				if (type === 'traveler') {
					const requestBody: ITravelerRegisterRequestBody = {
						name,
						email,
						password,
						address,
						type,
						national_id,
						date_of_birth,
						gender,
						is_guide,
					}

					const response: IResponseInterface<IUserAuthenticationResponse> =
						await api<IUserAuthenticationResponse>({
							url: '/auth/register',
							method: 'POST',
							body: JSON.stringify(requestBody),
						})

					if (response.success) {
						if (response.data) {
							const { user, access_token } = response.data
							login(user, access_token)
						}
					}
				} else {
					const requestBody: ICompanyRegisterRequestBody = {
						name,
						email,
						password,
						address,
						type,
						description,
					}

					const response: IResponseInterface<IUserAuthenticationResponse> =
						await api<IUserAuthenticationResponse>({
							url: '/auth/register',
							method: 'POST',
							body: JSON.stringify(requestBody),
						})

					if (response.success) {
						if (response.data) {
							const { user, access_token } = response.data
							login(user, access_token)
						}
					}
				}
			} catch (error: any) {
				console.log(JSON.stringify(error))
				// response.errors - div - display
			}
			setTimeout(() => {
				setIsLoading(false)
			}, 10000)
		}
	}

	// if (type === 'traveler') {
	// 	const isDisabled = (): boolean => {
	// 		return isLoading || name === '' || email === '' || password === '' || confirm_password === '' || address === '' || national_id === '' || date_of_birth === ''
	// 	}
	// }else{
	// 	const isDisabled = (): boolean => {
	// 		return isLoading || name === '' || email === '' || password === '' || confirm_password === '' || address === '' || description === ''
	// 	}
	// }

	return (
		<div className="container">
			<div className="left">
				<Card sx={{ maxWidth: 700 }} style={{ minHeight: '150vh' }}>
					<form onSubmit={sendData}>
						<CardContent>
							<h2>Register Now</h2>

							<div>
								<CustomInputField
									type={'text'}
									label={'Username'}
									value={name}
									setValue={set_name}
								/>
							</div>
							<br />

							<div>
								<CustomInputField
									type={'email'}
									label={'Email'}
									value={email}
									setValue={set_email}
								/>
							</div>
							<br />

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
							<div>
								<CustomInputField
									type={'text'}
									label={'Address'}
									value={address}
									setValue={set_address}
								/>
							</div>
							<br />

							<FormControl>
								<FormLabel id="demo-row-radio-buttons-group-label type">
									User Type
								</FormLabel>
								<RadioGroup
									row
									id="type"
									aria-labelledby="demo-row-radio-buttons-group-label"
									name="row-radio-buttons-group"
									defaultValue="traveler"
									onChange={(e) => {
										set_type(e.target.value as UserType)
									}}
								>
									<FormControlLabel
										value="traveler"
										control={<Radio />}
										label="Traveler"
									/>
									<FormControlLabel
										value="company"
										control={<Radio />}
										label="Company"
									/>
								</RadioGroup>
							</FormControl>
							{type === 'traveler' ? (
								<div>
									<div>
										<CustomInputField
											type={'text'}
											label={'National Id'}
											value={national_id}
											setValue={set_national_id}
										/>
									</div>
									<FormControl>
										<FormLabel id="demo-row-radio-buttons-group-label gender">
											Gender
										</FormLabel>
										<RadioGroup
											row
											value={gender}
											aria-labelledby="demo-row-radio-buttons-group-label"
											name="row-radio-buttons-group"
											onChange={(e) => {
												set_gender(e.target.value as GenderType)
											}}
										>
											<FormControlLabel
												value="male"
												control={<Radio />}
												label="Male"
											/>
											<FormControlLabel
												value="female"
												control={<Radio />}
												label="Female"
											/>
										</RadioGroup>
									</FormControl>
									<div>
										<LocalizationProvider dateAdapter={AdapterDateFns}>
											<DatePicker
												inputFormat="yyyy-MM-dd"
												label="Date of Birth"
												value={date_of_birth}
												onChange={(newValue) => {
													if (newValue) {
														set_date_of_birth(formatDate(newValue))
													}
												}}
												renderInput={(params) => <TextField {...params} />}
											/>
										</LocalizationProvider>
									</div>
									<div>
										<FormControlLabel
											control={<Checkbox defaultChecked />}
											label="Is Guide"
											onChange={(e) => {
												set_is_guide(!is_guide)
											}}
										/>
									</div>
								</div>
							) : (
								<div>
									<CustomInputField
										type={'text'}
										label={'Description'}
										value={description}
										setValue={set_description}
									/>
								</div>
							)}
						</CardContent>

						<CardActions>
							<LoadingButton
								// disabled={isDisabled()}
								loading={isLoading}
								variant="contained"
								type="submit"
							>
								Register
							</LoadingButton>
						</CardActions>
					</form>
				</Card>
			</div>

			{/* <div className="right">
        <img className="register" src="/register.png"/>
      </div> */}
		</div>
	)
}

export default Register
