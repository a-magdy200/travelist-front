import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { IGroupInterface } from '../../config/interfaces/IGroup.interface'
import { IResponseInterface } from '../../config/interfaces/IResponse.interface'
import api from '../../config/api'
import ShowGroupComponent from '../../components/groups/ShowGroup'
import Loader from "../../components/Loader";

const ShowGroup = () => {
	const [group, setGroup] = useState<IGroupInterface>()
	const [isLoading, setIsLoading] = useState(true);
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
					// console.log('response data',response.data)
				}
			}
		} catch (error: any) {
			console.log(error)
		}
	}
	useEffect(() => {
		getGroup().then(() => {
			setIsLoading(false);
		});
	}, [])

	if (isLoading) {
		return <Loader />
	}
	return <ShowGroupComponent group={group} />
}
export default ShowGroup
