import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { IFriendShowProps } from '../../config/interfaces/IFriendShowProps.interface'
import Avatar from '@mui/material/Avatar'
import { getCurrentUser } from '../../config/helpers/getCurrentUserFunction'
import { useEffect, useState } from 'react'
import { IUserInterface } from '../../config/interfaces/IUser.interface'
import { IResponseInterface } from '../../config/interfaces/IResponse.interface'
import api from '../../config/api'
import { IFriendInterface } from '../../config/interfaces/IFriend.interface'

const FriendCard = ({ friend }: IFriendShowProps) => {
	const [currentUser, setCurrentUser] = useState<IUserInterface>()
	const getCurrentUser = async () => {
		try {
			const response: IResponseInterface<IUserInterface> =
				await api<IUserInterface>({
					url: '/api/users/current/user',
				})

			if (response.success) {
				if (response.data) {
					setCurrentUser(response.data)
				}
			}
		} catch (error: any) {
			console.log(error)
		}
	}
	const removeFriend = async (id: number | undefined) => {
		if (window.confirm('Are you sure?')) {
			console.log(id)
			try {
				const response: IResponseInterface<IFriendInterface> =
					await api<IFriendInterface>({
						url: `/api/travelers/delete/${id}`,
						method: 'DELETE',
					})

				if (response.success) {
					alert('deleted successfuly')
					window.location.reload()
				}
			} catch (error: any) {
				console.log(error)
			}
		}
	}
	useEffect(() => {
		getCurrentUser()
	}, [])

	return (
		<div>
			{currentUser?.id === friend.traveler_sender.user.id ? (
				<Card sx={{ maxWidth: 945, m: 2 }}>
					<Avatar
						alt=""
						src={`http://localhost:4000/${friend.traveler_receiver.user.profile_picture}`}
						sx={{ width: 50, height: 50 }}
					/>
					{friend.traveler_receiver.user.name}
					<Button
						className="createButton"
						variant="contained"
						color="error"
						onClick={() => {
							removeFriend(friend.receiver_id)
						}}
					>
						Delete
					</Button>
					<CardActions></CardActions>
				</Card>
			) : (
				<Card sx={{ maxWidth: 945, m: 2 }}>
					<Avatar
						alt=""
						src={`http://localhost:4000/${friend.traveler_sender.user.profile_picture}`}
						sx={{ width: 50, height: 50 }}
					/>
					{friend.traveler_sender.user.name}
					<Button
						className="createButton"
						variant="contained"
						color="error"
						onClick={() => {
							removeFriend(friend.sender_id)
						}}
					>
						Delete
					</Button>
					<CardActions></CardActions>
				</Card>
			)}
		</div>
	)
}
export default FriendCard
