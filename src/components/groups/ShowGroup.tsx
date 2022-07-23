import Loader from '../Loader'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import { IGroupShowProps } from '../../config/interfaces/IGroupShowProps.interface'
import config from '../../config/app_config/config'
import ListPosts from '../../pages/post/list_posts'

import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent/CardContent'
import Box from '@mui/material/Box'
import useAuth from '../../hooks/useAuth'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { toast } from 'react-toastify'
import api from '../../config/api'
import { useState } from 'react'

const ShowGroupComponent = ({ group }: IGroupShowProps) => {
	const photoPath = `${config.apiUrl}/${group?.cover_picture}`
	const [followersCount, setFollowersCount] = useState(
		group?.followers_count || 0
	)
	const { user } = useAuth()

	const [isFollowing, setIsFollowing] = useState<boolean>(
		!!group?.followers?.length &&
			!!group.followers.find(({ id }) => id === user.id)
	)
	const followGroup = async () => {
		toast.info('Following...')
		await api<void>({
			url: `/api/groups/${group?.id}/follow`,
		})
		setIsFollowing(true)
		setFollowersCount((prev) => prev + 1)
		toast.success('Success')
	}
	const unfollowGroup = async () => {
		toast.info('Unfollowing...')
		await api<void>({
			url: `/api/groups/${group?.id}/unfollow`,
		})
		setIsFollowing(false)
		setFollowersCount((prev) => prev - 1)
		toast.success('Success')
	}
	return (
		<div>
			{group ? (
				<div>
					<Box display={'flex'} mb={2}>
						<Link to={`/group/list`}>
							<Button variant="contained">Back</Button>
						</Link>
						<Box mx={2}>
							<Typography variant={'h5'}>Group Details</Typography>
						</Box>
						{user.type === 'traveler' ? (
							<Link to="/post/create" state={{ id: group?.id }}>
								<Button variant="contained">Create post</Button>
							</Link>
							) : null }
						<Box ml={2}>
							{isFollowing ? (
								<Button onClick={unfollowGroup} variant="contained">
									Unfollow <CloseOutlined />
								</Button>
							) : (
								<Button onClick={followGroup} variant="contained">
									Follow <CheckOutlined />
								</Button>
							)}
						</Box>
					</Box>
					<Box mb={2}>
						<Card variant={'outlined'}>
							<CardContent>
								<Typography gutterBottom variant="h6" component="div">
									Country : {group?.country?.name}
								</Typography>

								<Typography gutterBottom variant="h6" component="div">
									Followers Count : {followersCount}
								</Typography>
							</CardContent>
						</Card>
					</Box>
					<ListPosts posts={group?.posts || []} />
				</div>
			) : (
				<Loader />
			)}
		</div>
	)
}
export default ShowGroupComponent
