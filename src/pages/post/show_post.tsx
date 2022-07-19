import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { IPostInterface } from '../../config/interfaces/IPost.interface'
import { IResponseInterface } from '../../config/interfaces/IResponse.interface'
import api from '../../config/api'
import ShowPostComponent from '../../components/post/ShowPost'

const ShowPost = () => {
	const [post, setPost] = useState<IPostInterface>()
	const { id } = useParams()
	const getPost= async () => {
		try {
			const response: IResponseInterface<IPostInterface> =
				await api<IPostInterface>({
					url: `/api/posts/${id}`,
				})
			if (response.success) {
				if (response.data) {
					setPost(response.data)
				}
			}
		} catch (error: any) {
			console.log(error)
		}
	}
	useEffect(() => {
		getPost()
	}, [])

	return (
		<div>
			{post ? <ShowPostComponent post={post} /> : <div></div>}
		</div>
	)
}
export default ShowPost
