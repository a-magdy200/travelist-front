import { IResponseInterface } from '../../config/interfaces/IResponse.interface'
import { useState, useEffect } from 'react'
import api from '../../config/api'
import Loader from '../../components/Loader'
import { IFriendRequestInterface } from '../../config/interfaces/IFriendRequest.interface'
import ListFriendRequestsComponent from '../../components/FriendRequest/ListFriendRequests'



const ListFriendRequests = () => {
	const [friendRequests, setFriendRequests] = useState<IFriendRequestInterface[]>([])
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
		getFriendRequests()
	}, [])
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
