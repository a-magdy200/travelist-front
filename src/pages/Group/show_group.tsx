import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { IGroupInterface } from '../../config/interfaces/IGroup.interface'
import { IResponseInterface } from '../../config/interfaces/IResponse.interface'
import api from '../../config/api'
import ShowGroupComponent from '../../components/groups/ShowGroup'
import Loader from "../../components/Loader";
import { toast } from 'react-toastify'

const ShowGroup = () => {
	const [group, setGroup] = useState<IGroupInterface>()
	const [isLoading, setIsLoading] = useState(false);
	const { id } = useParams()
	const getGroup = async () => {
		toast.info("Getting Group....");
		setIsLoading(true);
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
			toast.success("Get Group Successfully");

		} catch (error: any) {
			toast.error("An error has occurred");
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
