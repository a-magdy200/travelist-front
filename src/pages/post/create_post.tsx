import { useState, useEffect } from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { IResponseInterface } from '../../config/interfaces/IResponse.interface'
import api from '../../config/api'
import { IPostInterface } from '../../config/interfaces/IPost.interface'
import { useLocation } from 'react-router-dom'
const CreatePost= () => {
	const [content, setContent] = useState<string>('')
	const navigate = useNavigate()
	const location = useLocation()
	type LocationState = { id: number; };
	const { id } = location.state as LocationState
	const sendData = async function createPost(
		e: React.FormEvent<HTMLFormElement>
	) {
		e.preventDefault()
		const requestBody = {
			content,
			groupId:id
		}
		try {
			const response: IResponseInterface<IPostInterface> =
				await api<IPostInterface>({
					url: `/api/posts/`,
					method: 'POST',
					body: JSON.stringify(requestBody),
				})

			if (response.success) {
				if (response.data) {
						navigate(`/group/show/${id}`)
				}
			}
		} catch (error: any) {
			console.log(error)
		}
	}
	return (
		<div
			className="container"
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<div className="left">
				<Card sx={{ maxWidth: 700 }} style={{ minHeight: '50vh' }}>
					<form onSubmit={sendData}>
						<CardContent>
							<h2>Edit Basic Info</h2>
							<div>
								<TextareaAutosize
									maxRows={8}
									aria-label="maximum height"
									placeholder="what is in your mind?"
									onChange={(e) => {
										setContent(e.target.value)
									}}
								   style={{width: 300,height:100}}
								/>
							</div>
							<br />
						</CardContent>

						<CardActions>
							<Button variant="contained" type="submit">
								Post
							</Button>
						</CardActions>
					</form>
				</Card>
			</div>
		</div>
	)
}
export default CreatePost
