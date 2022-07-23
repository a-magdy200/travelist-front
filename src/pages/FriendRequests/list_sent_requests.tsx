import { IResponseInterface } from '../../config/interfaces/IResponse.interface'
import { useState, useEffect } from 'react'
import api from '../../config/api'
import Loader from '../../components/Loader'
import { IFriendRequestInterface } from '../../config/interfaces/IFriendRequest.interface'
import ListSentRequestsComponent from '../../components/FriendRequest/ListSentRequests'
import { toast } from 'react-toastify'



const ListSentRequests = () => {
	const [mySentRequests, setMySentRequests] = useState<IFriendRequestInterface[]>([])
	const [isLoading, setIsLoading] = useState(true);
	const [errors, setErrors] = useState([]);
	const getMySentRequests = async () => {
		toast.info("Getting List....");
		setErrors([]);
		setIsLoading(true);
		try {
			const response: IResponseInterface<IFriendRequestInterface[]> = await api<
				IFriendRequestInterface[]
			>({
				url: '/api/friendrequests/sent',
			})

			if (response.success) {
				if (response.data) {
					setMySentRequests(response.data)
					console.log(response.data)
				}
			}
			toast.success("Getting Requests Successfully");
		} catch (error: any) {
			setErrors(error?.response?.data?.errors || []);
			toast.error("An error has occurred");
	  
		}
	}
	useEffect(() => {
		getMySentRequests ().then(() => setIsLoading(false));
	}, [])
	if (isLoading) {
		return <Loader/>
	}
	return <div>
		{
		mySentRequests ?
		<ListSentRequestsComponent mySentRequests={mySentRequests} />
		:
		<div>No Send Requests yet</div>
	    }
		 </div>
}
export default ListSentRequests
