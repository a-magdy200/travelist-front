import { useState, useEffect } from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import TextareaAutosize from '@mui/base/TextareaAutosize'
import Button from '@mui/material/Button'
import { NavLink, Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { IResponseInterface } from '../../config/interfaces/IResponse.interface'
import { IUserRequestBodyInterface } from '../../config/interfaces/IUserRequestBody.interface'
import { useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import api from '../../config/api'
import { IPostInterface } from '../../config/interfaces/IPost.interface'
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import Loader from "../../components/Loader";
const EditPost = () => {
	const [post, setPost] = useState<IPostInterface>()
	const [content, setContent] = useState<string>('')
	const [isLoading, setIsLoading] = useState(true);
	const { id } = useParams()
	const navigate = useNavigate()
	const getPostDetails = async () => {
		try {
			const response: IResponseInterface<IPostInterface> =
				await api<IPostInterface>({
					url: `/api/posts/${id}`,
				})

			if (response.success) {
				if (response.data) {
					setPost(response.data)
					setContent(response.data.content)
				}
			}
		} catch (error: any) {
			console.log(error)
		}
	}
	useEffect(() => {
		getPostDetails().then(() => {
			setIsLoading(false);
		})
	}, [])
	async function sendData(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const requestBody = {
			content,
		}
		try {
			const response: IResponseInterface<IPostInterface> =
				await api<IPostInterface>({
					url: `/api/posts/${id}`,
					method: 'PUT',
					body: JSON.stringify(requestBody),
				})

			if (response.success) {
				navigate('/group/show/' + post?.groupId)
			}
		} catch (error: any) {
			console.log(error)
		}
	}
	if (isLoading) {
		return <Loader />
	}
	return (
		<Card variant={"outlined"}>
			<CardContent>
				<form onSubmit={sendData}>
					<Box p={4} display={"flex"} flexDirection={"column"} alignItems={"center"}>
						<h2>Edit post content</h2>
						<Box mb={2} width={"100%"}>
							<TextField
								multiline={true}
								fullWidth={true}
								rows={8}
								value={content}
								label={"Content"}
								variant={"outlined"}
								aria-label="maximum height"
								placeholder="what is in your mind?"
								onChange={(e) => {
									setContent(e.target.value);
								}}
							/>
						</Box>
						<Button variant="contained" type="submit">
							Post
						</Button>
					</Box>
				</form>
			</CardContent>
		</Card>
	)
}
export default EditPost