import Profile from '../../components/Profile/Profile'
import { useEffect, useState } from 'react'
import api from '../../config/api'
import Stack from '@mui/material/Stack'
import { useParams } from 'react-router-dom'
import { IResponseInterface } from '../../config/interfaces/IResponse.interface'
import { IUserInterface } from '../../config/interfaces/IUser.interface'
const UserBaseData = () => {
	const [user, setUser] = useState<IUserInterface>()
	const { id } = useParams()
	const getUserProfile = async () => {
		try {
			const response: IResponseInterface<IUserInterface> =
				await api<IUserInterface>({
					url: `/api/users`,
					method: 'GET',
				})

			if (response.success) {
				if (response.data) {
					setUser(response.data)
					console.log(response.data)
				}
			}
		} catch (error: any) {
			console.log(error)
		}
	}
	useEffect(() => {
		getUserProfile()
	}, [])
	return (
			<>
				{/* to view company data */}

				<div>
					{user ? <Profile user={user} /> : <div>not found</div>}
				</div>
			</>
	)
}

export default UserBaseData
