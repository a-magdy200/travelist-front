import UserBasicInfo from '../../components/Profile/UserBasicInfo'
import { useEffect, useState } from 'react'
import api from '../../config/api'
import { IResponseInterface } from '../../config/interfaces/IResponse.interface'
import { IUserInterface } from '../../config/interfaces/IUser.interface'
const UserBaseData = () => {
	const [user, setUser] = useState<IUserInterface>()
	const getUserProfile = async () => {
		try {
			const response: IResponseInterface<IUserInterface> =
				await api<IUserInterface>({
					url: `/api/users/`,
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

			{/*<div>{user ? <UserBasicInfo user={user} /> : <div>not found</div>}</div>*/}
		</>
	)
}

export default UserBaseData
