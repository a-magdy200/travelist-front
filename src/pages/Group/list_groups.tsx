import { GroupsOutlined } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import ListGroupsComponent from '../../components/groups/ListGroups'
import api from '../../config/api'
import { IGroupInterface } from '../../config/interfaces/IGroup.interface'
import { IResponseInterface } from '../../config/interfaces/IResponse.interface'

const ListGroups = () => {
	const [groups, setGroups] = useState<IGroupInterface[]>()

	const getGroups = async () => {
		try {
			const response: IResponseInterface<IGroupInterface[]> = await api<
				IGroupInterface[]
			>({
				url: '/api/groups/all',
			})

			if (response.success) {
				if (response.data) {
					setGroups(response.data)
					// console.log(response.data)
				}
			}
		} catch (error: any) {
			console.log(error)
		}
	}

	useEffect(() => {
		getGroups()
	}, [])
	return (
		<div>
			<h1>Groups Page</h1>
			{groups ? (
				groups.map((group, index) => (
					<ListGroupsComponent group={group} key={index} />
				))
			) : (
				<div>No groups yet</div>
			)}
		</div>
	)
}
export default ListGroups
