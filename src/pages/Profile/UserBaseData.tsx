import { useEffect, useState } from 'react'
import api from '../../config/api'
import User from '../../components/Profile/User'
import { useParams } from 'react-router-dom'
import { IResponseInterface } from '../../config/interfaces/IResponse.interface'
import { IUserInterface } from '../../config/interfaces/IUser.interface'
// import { IUserShowProps } from '../../config/interfaces/IUserShowProps.interface'
const UserBaseData = () => {
	const [user, setUser] = useState<IUserInterface>()
	const getUserProfile = async () => {
		try {
			const response: IResponseInterface<IUserInterface> =
				await api<IUserInterface>({
					url: `/api/users/`,
					method: 'GET',
				})

			if (response.success) {
				if (response.data) {
					setUser(response.data)
					console.log('response data get user',response.data)
				}
			}
		} catch (error: any) {
			console.log(error)
		}
	}
	useEffect(() => {
		getUserProfile()
	}, [])
	return <div>{user ? <User user={user} /> : <div>not found</div>}</div>
}

export default UserBaseData
