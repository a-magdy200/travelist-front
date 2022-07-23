import { IProgramInterface } from '../../config/interfaces/IProgram.interface'
import { useEffect, useState } from 'react'
import { IResponseInterface } from '../../config/interfaces/IResponse.interface'
import api from '../../config/api'
import { IFeedPost } from '../../config/interfaces/IFeedPost.interface'
import FeedPageComponent from '../../components/FeedPage/feedpage'
import Typography from "@mui/material/Typography";
import Loader from "../../components/Loader";
import io from 'socket.io-client';
import { toast } from 'react-toastify'

const FeedHome = () => {
	const [feedPosts, setFeedPosts] = useState<IFeedPost[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [errors, setErrors] = useState([])
	const getFeedPosts = async () => {
		try {

			// const socket = io('http://localhost:4000/api/travelers/feed');
			// socket.on('connect',()=>{
			// 	socket.emit("custom_event", 'hadeer')
			// 	socket.on('return_event', (parameter:)=>{
			// 		console.log
			// 	})

			// })

			const response: IResponseInterface<IFeedPost[]> = await api<IFeedPost[]>({
				url: '/api/travelers/feed',
			})

			if (response.success) {
				if (response.data) {
					setFeedPosts(response.data)
					console.log(response.data)
				}
			}
			toast.success('Get Feeds Successfully')
		} catch (error: any) {
			setErrors(error?.response?.data?.errors || [])
			toast.error('An error has occurred')
		}
	}

	useEffect(() => {
		getFeedPosts().then(() => setIsLoading(false))
	}, [])
	if (isLoading) {
		return <Loader />
	}
	return (
		<div>
			<Typography variant={'h5'}>Feed Page</Typography>
			{feedPosts ? (
				feedPosts.map((feedPost, index) => (
					<FeedPageComponent feedPost={feedPost} key={index} />
				))
			) : (
				<div>No followed groups</div>
			)}
		</div>
	)
}
export default FeedHome
