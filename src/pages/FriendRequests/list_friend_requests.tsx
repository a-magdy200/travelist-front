import { IResponseInterface } from '../../config/interfaces/IResponse.interface'
import { useState, useEffect } from 'react'
import api from '../../config/api'
import Loader from '../../components/Loader'
import { IFriendRequestInterface } from '../../config/interfaces/IFriendRequest.interface'
import ListFriendRequestsComponent from '../../components/FriendRequest/ListFriendRequests'
import { toast } from 'react-toastify'



const ListFriendRequests = () => {
	const [friendRequests, setFriendRequests] = useState<IFriendRequestInterface[]>([])
	const [isLoading, setIsLoading] = useState(false);
	const [errors, setErrors] = useState([]);
	const getFriendRequests = async () => {
		toast.info("Getting Requests....");
		setErrors([]);
		setIsLoading(true);
		try {
			const response: IResponseInterface<IFriendRequestInterface[]> = await api<
				IFriendRequestInterface[]
			>({
				url: '/api/friendrequests/received',
			})

			if (response.success) {
				if (response.data) {
					setFriendRequests(response.data)
					console.log(response.data)
				}
			}
			toast.success("Get Requests Successfully");
		} catch (error: any) {
			setErrors(error?.response?.data?.errors || []);
			toast.error("An error has occurred");
 
		}
	}
	useEffect(() => {
		getFriendRequests().then(() => setIsLoading(false));
	}, [])
	if (isLoading) {
		return <Loader/>
	}
	return <div>
		{
		friendRequests ?
		<ListFriendRequestsComponent friendRequests={friendRequests} />
		:
		<div>No Friend Requests yet</div>
	    }
		 </div>
}
export default ListFriendRequests
