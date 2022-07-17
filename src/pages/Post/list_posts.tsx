import { GroupsOutlined } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import ListPostsComponent from '../../components/posts/ListPosts'
import api from '../../config/api'
import { IGroupInterface } from '../../config/interfaces/IGroup.interface'
import { IPostInterface } from '../../config/interfaces/IPost.interface'
import { IResponseInterface } from '../../config/interfaces/IResponse.interface'

const ListPosts = () => {
	const [posts, setPosts] = useState<IPostInterface[]>()

	const getPosts = async () => {
		try {
			const response: IResponseInterface<IPostInterface[]> =
				await api<IPostInterface[]>({
					url: '/api/posts/',
				})

			if (response.success) {
				if (response.data) {
					setPosts(response.data)
					// console.log(response.data)
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
			<h1>Posts Page</h1>
			{posts? posts.map((post,index) =>(<ListPostsComponent post={post} key={index} />)) : <div></div>}
		</div>
	)
}
export default ListPosts
