import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { IPostInterface } from '../../config/interfaces/IPost.interface'
import { IResponseInterface } from '../../config/interfaces/IResponse.interface'
import api from '../../config/api'
import ShowPostComponent from '../../components/post/ShowPost'
import Loader from '../../components/Loader'
import DisplayErrorsList from '../../components/DisplayErrors/DisplayErrorsList'
import { toast } from 'react-toastify'

const ShowPost = () => {
	const [post, setPost] = useState<IPostInterface>()
	const { id } = useParams()
	const [isLoading, setIsLoading] = useState(false)
	const [errors, setErrors] = useState([])
	const getPost = async () => {
		toast.info('Getting post....')
		setErrors([])
		setIsLoading(true)
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
			toast.success('Got Post Successfully')
		} catch (error: any) {
			setErrors(error?.response?.data?.errors || [])
			toast.error('An error has occurred')
		}
		setIsLoading(false)
	}
	useEffect(() => {
		getPost()
	}, [])
	if (isLoading) {
		return <Loader />
	}

	return (
		<div>
			{post ? (
				<ShowPostComponent post={post} />
			) : (
				<DisplayErrorsList errors={errors} />
			)}
		</div>
	)
}
export default ShowPost
