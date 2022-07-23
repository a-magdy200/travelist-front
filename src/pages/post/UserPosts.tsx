import { useEffect, useState } from 'react'
import { IPostInterface } from '../../config/interfaces/IPost.interface'
import Loader from '../../components/Loader'
import ListPosts from './list_posts'
import { IResponseInterface } from '../../config/interfaces/IResponse.interface'
import api from '../../config/api'
import { toast } from 'react-toastify'
import DisplayErrorsList from '../../components/DisplayErrors/DisplayErrorsList'

const UserPosts = () => {
	const [posts, setPosts] = useState<IPostInterface[]>([])
	const [errors, setErrors] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	useEffect(() => {
		;(async () => {
			toast.info('Getting posts....')
			setErrors([])
			try {
				const response: IResponseInterface<IPostInterface[]> = await api<
					IPostInterface[]
				>({
					url: '/api/posts/',
				})
				if (response.success && response.data) {
					setPosts(response.data)
				}
			} catch (error: any) {
				setErrors(error?.response?.data?.errors || [])
				toast.error('An error has occurred')
			}
			setIsLoading(false)
		})()
	}, [])
	if (isLoading) {
		return <Loader />
	}
	return (
		<div>
 			<DisplayErrorsList errors={errors} />
			<ListPosts posts={posts} />
		</div>
	)
}
export default UserPosts
