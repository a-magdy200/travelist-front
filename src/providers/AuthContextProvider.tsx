import { ComponentProps, useEffect, useState } from 'react'
import AuthContext from '../contexts/AuthContext'
import { IUserInterface } from '../config/interfaces/IUser.interface'
import { ACCESS_TOKEN } from '../config/helpers/constants'
import { useNavigate } from "react-router-dom";
import { LoginCredentials } from '../config/interfaces/props/ILoginFormProps'
import api from '../config/api'
import { IResponseInterface } from '../config/interfaces/responses/IResponse.interface'
import { IUserAuthenticationResponse } from '../config/interfaces/responses/IUserAuthenticationResponse.interface'
import { RegisterCredentials } from '../config/interfaces/props/IRegisterFormProps'
import socketListeners from "../config/helpers/socket-listeners";
import socket from "../config/socket";
import Loader from "../components/Loader";

const AuthContextProvider = ({ children }: ComponentProps<any>) => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
	const [userDetails, setUserDetails] = useState<IUserInterface>({
		name: '',
		profile_picture: '',
		type: '',
		id: 0,
	})
	const navigate = useNavigate()
	const makeAuth = (data: IUserAuthenticationResponse) => {
		const { user, access_token } = data
		setIsLoggedIn(true)
		if (user.id !== userDetails.id) {
			socket.disconnect();
			localStorage.setItem(ACCESS_TOKEN, access_token)
			socket.auth = { userId: user.id };
			socket.connect();
			socketListeners(socket)
		}
		setUserDetails(user)
	}
	const authContextValue = {
		isLoggedIn,
		makeAuth,
		user: userDetails,
		logout: () => {
			localStorage.removeItem(ACCESS_TOKEN)
			setIsLoggedIn(false)
			socket.removeAllListeners()
			socket.disconnect();
			setUserDetails({
				name: '',
				profile_picture: '',
				type: '',
				id: 0,
			})
		},
		getUser: async () => {
			const response: IResponseInterface<IUserInterface> = await api({
				url: '/api/admin/user/profile',
			})
			if (response.data) {
				const token = localStorage.getItem(ACCESS_TOKEN) ?? ''

				makeAuth({user: response.data, access_token: token});
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
		updateCoverPicture: async (file?: File) => {
			if (file) {
				const formData = new FormData()
				formData.append('cover_picture', file)
				await api({
					url: '/api/admin/user/update-cover-picture',
					method: 'patch',
					body: formData,
				})
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
			navigate("/")
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
			navigate("/")
		},
	}
	useEffect(() => {
		(async () => {
			const token = localStorage.getItem(ACCESS_TOKEN) ?? ''
			if (token !== '') {
				await authContextValue.getUser()
			}
			setIsLoading(false);
		})();
		return () => {
			socket.off('connect');
			socket.off('disconnect');
		}
	}, [])
	if (isLoading) {
		return <Loader/>
	}
	return (
		<AuthContext.Provider value={authContextValue}>
			{children}
		</AuthContext.Provider>
	)
}
export default AuthContextProvider
