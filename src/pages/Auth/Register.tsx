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

import { useNavigate } from 'react-router-dom'
import api from '../../config/api'
import { ITravelerRegisterRequestBody } from '../../config/interfaces/ITravelerRegisterRequestBody'
import { UserType } from '../../config/types/user.type'
import { GenderType } from '../../config/types/gender.type'
import { IResponseInterface } from '../../config/interfaces/IResponse.interface'
import { IUserAuthenticationResponse } from '../../config/interfaces/IUserAuthenticationResponse.interface'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import React from 'react'
import useAuth from '../../hooks/useAuth'
import { ICompanyRegisterRequestBody } from '../../config/interfaces/ICompanyRegisterRequestBody'

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
	const [date_of_birth, set_date_of_birth] = React.useState<Date | null>(null)

	const [description, set_description] = useState('')
	const { login } = useAuth()

	const navigate = useNavigate()

	async function sendData(e: any) {
		e.preventDefault()
		let checkSubmit = true

		if (password !== confirm_password) {
			checkSubmit = false
		}

		if (checkSubmit) {
			try {
				if (type == 'traveler') {
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

				// const response = await fetch("http://localhost:4000/auth/register", {
				//   method: "POST",
				//   headers: { "content-Type": "application/json" },
				//   body: JSON.stringify({requestBody}),
				// });

				// if (response.success) {
				//   navigatetohome
				// }else{
				//   setPass("");
				//   setPassConfirm("");
				// }


			} catch (error: any) {
				console.log(JSON.stringify(error))
			}
			//   if (response.ok) {
			//     console.log(response.status);
			//     console.log("register done");
			//     const USER_TOKEN = await response.text();
			//     const token = JSON.parse(USER_TOKEN).token;
			//     localStorage.setItem("TOKEN", token);
			//     // redirect to home
			//     // navigate('/profile',);
			//   }
			// } catch (error) {
			//   console.log(error);
			// }
		}
	}

	return (
		<div className="container">
			<div className="left">
				<Card sx={{ maxWidth: 700 }} style={{ minHeight: '150vh' }}>
					<form onSubmit={sendData}>
						<CardContent>
							<h2>Register Now</h2>

							<div>
								<TextField
									required
									fullWidth
									id="name"
									label="username"
									size="small"
									onChange={(e) => {
										set_name(e.target.value)
									}}
								/>
							</div>
							<br />

							<div>
								<TextField
									required
									fullWidth
									id="email"
									type="email"
									label="email"
									size="small"
									onChange={(e) => {
										set_email(e.target.value)
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
									label="password"
									size="small"
									onChange={(e) => {
										set_password(e.target.value)
									}}
								/>
							</div>
							<br />

							<div>
								<TextField
									required
									fullWidth
									id="confirmpassword"
									type="password"
									label="confirm password"
									size="small"
									onChange={(e) => {
										set_confirm_password(e.target.value)
									}}
								/>
							</div>
							<br />
							<div>
								<TextField
									required
									fullWidth
									id="address"
									label="address"
									size="small"
									onChange={(e) => {
										set_address(e.target.value)
									}}
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
										<TextField
											id="outlined-multiline-flexible"
											label="National ID"
											size="small"
											fullWidth
											maxRows={4}
											onChange={(e) => {
												set_national_id(e.target.value)
											}}
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
												label="Basic example"
												value={date_of_birth}
												onChange={(newValue) => {
                          let datevalue = newValue.getFullYear() + "-" + (newValue.getMonth() + 1) + "-" + (newValue.getDay() + 1)
													set_date_of_birth(datevalue)
												}}
												renderInput={(params) => <TextField {...params} />}
											/>
										</LocalizationProvider>

										{/* dateof birth */}

										{/* <TextField
                      id="outlined-flexible"
                      size="small"
                      type="date"
                      fullWidth
                      maxRows={4}
                      onChange={(e) => {
                        set_date_of_birth(new Date(e.target.value));
                        console.log(date_of_birth);
                      }}
                    /> */}
									</div>
									<div>
										<FormControlLabel
											control={<Checkbox defaultChecked />}
											label="Is Guide"
											onChange={(e) => {
												set_is_guide(!is_guide)
												console.log(is_guide)
											}}
										/>
									</div>
								</div>
							) : (
								<div>
									<TextField
										id="outlined-multiline-flexible"
										label="Description"
										size="small"
										multiline
										fullWidth
										maxRows={4}
										onChange={(e) => {
											set_description(e.target.value)
										}}
									/>
								</div>
							)}
						</CardContent>

						<CardActions>
							<Button variant="contained" type="submit">
								Register
							</Button>
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
