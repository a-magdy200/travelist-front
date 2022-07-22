import { IProgramInterface } from '../../config/interfaces/IProgram.interface'
import { useEffect, useState } from 'react'
import { IResponseInterface } from '../../config/interfaces/IResponse.interface'
import api from '../../config/api'
import { IFeedPost } from '../../config/interfaces/IFeedPost.interface'
import FeedPageComponent from '../../components/FeedPage/feedpage'

const FeedHome = () => {
	const [feedPosts, setFeedPosts] = useState<IFeedPost[]>([])

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
		getFeedPosts()
	}, [])

	return (
		<div>
			<h1>Feed Page</h1>
			{feedPosts ? (
				feedPosts.map((feedPost, index) => (
					<FeedPageComponent feedPost={feedPost} key={index} />
				))
			) : (
				<div></div>
			)}
		</div>
	)
}
export default FeedHome
