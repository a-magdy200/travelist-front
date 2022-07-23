import { useEffect, useState } from 'react'
import ListPostsComponent from '../../components/post/ListPosts'
import api from '../../config/api'
import { IPostInterface } from '../../config/interfaces/IPost.interface'
import { IResponseInterface } from '../../config/interfaces/IResponse.interface'
import { toast } from 'react-toastify'
import DisplayErrorsList from '../../components/DisplayErrors/DisplayErrorsList'
import Loader from '../../components/Loader'

const ListMyPosts = () => {
	const [posts, setPosts] = useState<IPostInterface[]>()
	const [isLoading, setIsLoading] = useState(false)
	const [errors, setErrors] = useState([])
	const getPosts = async () => {
		try {
			toast.info('List posts....')
			setErrors([])
			setIsLoading(true)
			const response: IResponseInterface<IPostInterface[]> = await api<
				IPostInterface[]
			>({
				url: '/api/posts/myPosts',
			})

			if (response.success) {
				if (response.data) {
					setPosts(response.data)
					console.log(response.data)
				}
			}
			toast.success('Getting Posts Success')
		} catch (error: any) {
			setErrors(error?.response?.data?.errors || [])
			toast.error('An error has occurred')
		}
		setIsLoading(false)
	}

	useEffect(() => {
		getPosts()
	}, [])
	if (isLoading) {
		return <Loader />
	}
	return (
		<div>
			{posts ? (
				posts.map((post, index) => (
					<ListPostsComponent post={post} key={index} />
				))
			) : (
				<DisplayErrorsList errors={errors} />
			)}
		</div>
	)
}
export default ListMyPosts
