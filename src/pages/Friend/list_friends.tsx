import { IResponseInterface } from '../../config/interfaces/IResponse.interface'
import { useState, useEffect } from 'react'
import api from '../../config/api'
import Loader from '../../components/Loader'
import { IFriendInterface } from '../../config/interfaces/IFriend.interface'
import ListFriendsComponent from '../../components/Friend/ListFriends'



const ListFriends = () => {
	const [friends, setFriends] = useState<IFriendInterface[]>([])
	const getFriends = async () => {
		try {
			const response: IResponseInterface<IFriendInterface[]> = await api<
				IFriendInterface[]
			>({
				url: '/api/travelers/friends',
			})
	
			if (response.success) {
				if (response.data) {
					setFriends(response.data)
					console.log(response.data)
				}
			}
		} catch (error: any) {
			console.log(error)
		}
	}
	useEffect(() => {
		getFriends()
	}, [])
	return <div>
		{
		friends ? 
		<ListFriendsComponent friends={friends} /> 
		:
		<Loader/>
	    }
		 </div>
}
export default ListFriends
