import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { IGroupInterface } from '../../config/interfaces/IGroup.interface'
import { IResponseInterface } from '../../config/interfaces/IResponse.interface'
import api from '../../config/api'
import ShowGroupComponent from '../../components/groups/ShowGroup'

const ShowGroup = () => {
	const [group, setGroup] = useState<IGroupInterface>()
	const { id } = useParams()

	const getGroup = async () => {
		try {
			const response: IResponseInterface<IGroupInterface> =
				await api<IGroupInterface>({
					url: `/api/groups/show/${id}`,
				})
			if (response.success) {
				if (response.data) {
					setGroup(response.data)
				}
			}
		} catch (error: any) {
			console.log(error)
		}
	}
	useEffect(() => {
		getGroup()
	}, [])

	return (
		<div>
			{group ? <ShowGroupComponent group={group} /> : <div></div>}
		</div>
	)
}
export default ShowGroup
