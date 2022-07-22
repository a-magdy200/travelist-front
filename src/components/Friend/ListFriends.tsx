import { IFriendInterface } from '../../config/interfaces/IFriend.interface'
import { IFriendListProps } from '../../config/interfaces/IFriendListProps.interface'
import FriendCard from './FriendCard'

const ListFriendsComponent = ({ friends }: IFriendListProps) => {
	return (
		<div>
			{friends.length ? (
				friends.map((friend: IFriendInterface, index) => (
					<FriendCard friend={friend} key={index} />
				))
			) : (
				<div>No Friends Yet</div>
			)}
		</div>
	)
}

export default ListFriendsComponent
