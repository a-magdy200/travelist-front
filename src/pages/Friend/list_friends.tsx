import { IResponseInterface } from '../../config/interfaces/IResponse.interface'
import { useState, useEffect } from 'react'
import api from '../../config/api'
import Loader from '../../components/Loader'
import { IFriendInterface } from '../../config/interfaces/IFriend.interface'
import ListFriendsComponent from '../../components/Friend/ListFriends'
import { toast } from 'react-toastify'

const ListFriends = () => {
	const [friends, setFriends] = useState<IFriendInterface[]>([])
	const [isLoading, setIsLoading] = useState(false)
	const [errors, setErrors] = useState([])
	const getFriends = async () => {
		setErrors([])
		setIsLoading(true)
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
			setErrors(error?.response?.data?.errors || [])
			toast.error('An error has occurred')
		}
		setIsLoading(false)
	}
	useEffect(() => {
		getFriends().then(() => setIsLoading(false))
	}, [])
	if (isLoading) {
		return <Loader />
	}
	return (
		<div>
			{friends ? (
				<ListFriendsComponent friends={friends} />
			) : (
				<div>No friends yet</div>
			)}
		</div>
	)
}
export default ListFriends
