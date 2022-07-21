import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { IGroupInterface } from '../../config/interfaces/IGroup.interface'
import { IResponseInterface } from '../../config/interfaces/IResponse.interface'
import { IUserInterface } from '../../config/interfaces/IUser.interface'
import api from '../../config/api'
import ShowGroupComponent from '../../components/groups/ShowGroup'

const ShowGroup = () => {
	const [group, setGroup] = useState<IGroupInterface>()
	const [userId, setUserId] = useState<IUserInterface>()
	const { id } = useParams()
	let props = {
		group: group,
		userId: userId,
	}
	const getGroup = async () => {
		try {
			const response: IResponseInterface<IGroupInterface> =
				await api<IGroupInterface>({
					url: `/api/groups/show/${id}`,
				})
			if (response.success) {
				if (response.data) {
					setGroup(response.data)
					// console.log('response data',response.data)
				}
			}
		} catch (error: any) {
			console.log(error)
		}
	}
	useEffect(() => {
		getGroup()
	}, [])
	const getUserId = async () => {
		try {
			const response: IResponseInterface<IUserInterface> =
				await api<IUserInterface>({
					url: `/api/users/current/user`,
				})
			if (response.success) {
				if (response.data) {
					setUserId(response.data)
					console.log('response data', response.data)
				}
			}
		} catch (error: any) {
			console.log(error)
		}
	}
	useEffect(() => {
		getUserId()
	}, [])

	return <div>{group ? <ShowGroupComponent group={group} /> : <div></div>}</div>
}
export default ShowGroup
