import { IProgramInterface } from '../../config/interfaces/IProgram.interface'
import { useEffect, useState } from 'react'
import { IResponseInterface } from '../../config/interfaces/IResponse.interface'
import api from '../../config/api'
import { IFeedPost } from '../../config/interfaces/IFeedPost.interface'
import FeedPageComponent from '../../components/FeedPage/feedpage'
import Typography from "@mui/material/Typography";
import Loader from "../../components/Loader";

const FeedHome = () => {
	const [feedPosts, setFeedPosts] = useState<IFeedPost[]>([])
	const [isLoading, setIsLoading] = useState(true);
	const getFeedPosts = async () => {
		try {
			const response: IResponseInterface<IFeedPost[]> = await api<IFeedPost[]>({
				url: '/api/travelers/feed',
			})

			if (response.success) {
				if (response.data) {
					setFeedPosts(response.data)
					console.log(response.data)
				}
			}
		} catch (error: any) {
			console.log(error)
		}
	}

	useEffect(() => {
		getFeedPosts().then(() => setIsLoading(false))
	}, [])
	if (isLoading) {
		return <Loader/>
	}
	return (
		<div>
			<Typography variant={"h5"}>Feed Page</Typography>
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
