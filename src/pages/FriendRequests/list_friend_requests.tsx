import { IResponseInterface } from '../../config/interfaces/IResponse.interface'
import { useState, useEffect } from 'react'
import api from '../../config/api'
import Loader from '../../components/Loader'
import { IFriendRequestInterface } from '../../config/interfaces/IFriendRequest.interface'
import ListFriendRequestsComponent from '../../components/FriendRequest/ListFriendRequests'



const ListFriendRequests = () => {
	const [friendRequests, setFriendRequests] = useState<IFriendRequestInterface[]>([])
	const [isLoading, setIsLoading] = useState(true);
	const getFriendRequests = async () => {
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
		} catch (error: any) {
			console.log(error)
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
		<Loader/>
	    }
		 </div>
}
export default ListFriendRequests
