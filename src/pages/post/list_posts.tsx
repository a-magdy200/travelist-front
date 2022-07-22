import { useEffect, useState } from 'react'
import ListPostsComponent from '../../components/post/ListPosts'
import api from '../../config/api'
import { IPostInterface } from '../../config/interfaces/IPost.interface'
import { IResponseInterface } from '../../config/interfaces/IResponse.interface'

const ListPosts = () => {
	const [posts, setPosts] = useState<IPostInterface[]>()
	const getPosts = async () => {
		try {
			const response: IResponseInterface<IPostInterface[]> = await api<
				IPostInterface[]
			>({
				url: '/api/posts/',
			})

			if (response.success) {
				if (response.data) {
					setPosts(response.data)
					console.log(response.data)
				}
			}
		} catch (error: any) {
			console.log(error)
		}
	}

	useEffect(() => {
		getPosts()
	}, [])
	return (
		<div>
			{posts ? (
				posts.map((post, index) => (
					<ListPostsComponent post={post} key={index} />
				))
			) : (
				<div></div>
			)}
		</div>
	)
}
export default ListPosts
