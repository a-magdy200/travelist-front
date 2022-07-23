import { IResponseInterface } from '../../config/interfaces/IResponse.interface'
import { useState, useEffect } from 'react'
import api from '../../config/api'
import Loader from '../../components/Loader'
import { IFriendRequestInterface } from '../../config/interfaces/IFriendRequest.interface'
import ListSentRequestsComponent from '../../components/FriendRequest/ListSentRequests'



const ListSentRequests = () => {
	const [mySentRequests, setMySentRequests] = useState<IFriendRequestInterface[]>([])
	const getMySentRequests = async () => {
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
		} catch (error: any) {
			console.log(error)
		}
	}
	useEffect(() => {
		getMySentRequests ()
	}, [])
	return <div>
		{
		mySentRequests ? 
		<ListSentRequestsComponent mySentRequests={mySentRequests} /> 
		:
		<Loader/>
	    }
		 </div>
}
export default ListSentRequests