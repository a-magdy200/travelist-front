import { ComponentProps, useEffect, useState } from 'react'
import AuthContext from '../contexts/AuthContext'
import { IUserInterface } from '../config/interfaces/entities/IUser.interface'
import { ACCESS_TOKEN } from '../config/helpers/constants'
import { useNavigate } from 'react-router-dom'
import { LoginCredentials } from '../config/interfaces/props/ILoginFormProps'
import api from '../config/api'
import { IResponseInterface } from '../config/interfaces/responses/IResponse.interface'
import { IUserAuthenticationResponse } from '../config/interfaces/responses/IUserAuthenticationResponse.interface'
import { RegisterCredentials } from '../config/interfaces/props/IRegisterFormProps'

const AuthContextProvider = ({ children }: ComponentProps<any>) => {
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
	const [userDetails, setUserDetails] = useState<IUserInterface>({
		name: '',
		profile_picture: '',
		role: '',
	})
	const navigate = useNavigate()
	const makeAuth = (data: IUserAuthenticationResponse) => {
		const { user, access_token } = data
		setIsLoggedIn(true)
		setUserDetails(user)
		localStorage.setItem(ACCESS_TOKEN, access_token)
		navigate('/')
	}
	const authContextValue = {
		isLoggedIn,
		makeAuth,
		user: userDetails,
		logout: () => {
			localStorage.removeItem(ACCESS_TOKEN)
			setIsLoggedIn(false)
			setUserDetails({
				name: '',
				profile_picture: '',
				role: '',
			})
		},
		getUser: async () => {
			const response: IResponseInterface<IUserInterface> = await api({
				url: '/api/admin/user/profile',
			})
			if (response.data) {
				setUserDetails(response.data)
			}
		},
		updateUser: async (values: IUserInterface) => {
			const { name, address } = values
			await api({
				url: '/api/admin/user/profile',
				method: 'put',
				body: { name, address },
			})
			setUserDetails((previous: IUserInterface) => ({
				...previous,
				name,
				address,
			}))
			navigate('/profile')
		},
		changePassword: async (password: string) => {
			await api({
				url: '/api/admin/user/update-password',
				method: 'patch',
				body: { password },
			})
		},
		updateProfilePicture: async (file?: File) => {
			if (file) {
				const formData = new FormData()
				formData.append('profile_picture', file)
				const response: IResponseInterface<string> = await api({
					url: '/api/admin/user/update-profile-picture',
					method: 'patch',
					body: formData,
				})
				if (response.success) {
					setUserDetails((previous: IUserInterface) => ({
						...previous,
						profile_picture: response?.data || previous.profile_picture,
					}))
				}
			}
		},
		login: async (credentials: LoginCredentials) => {
			const response: IResponseInterface<IUserAuthenticationResponse> =
				await api({
					url: '/api/admin/auth/login',
					method: 'post',
					body: credentials,
				})
			if (response.data) {
				makeAuth(response.data)
			}
		},
		register: async (credentials: RegisterCredentials) => {
			const response: IResponseInterface<IUserAuthenticationResponse> =
				await api({
					url: '/api/admin/auth/register',
					method: 'post',
					body: credentials,
				})
			if (response.data) {
				makeAuth(response.data)
			}
		},
	}
	useEffect(() => {
		const token = localStorage.getItem(ACCESS_TOKEN) ?? ''
		if (token !== '') {
			setIsLoggedIn(true)
			authContextValue.getUser()
		}
	}, [])
	return (
		<AuthContext.Provider value={authContextValue}>
			{children}
		</AuthContext.Provider>
	)
}
export default AuthContextProvider
