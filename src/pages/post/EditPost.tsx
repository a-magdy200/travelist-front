import { useState, useEffect } from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import TextareaAutosize from '@mui/base/TextareaAutosize';
import Button from '@mui/material/Button'
import { NavLink ,Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { IResponseInterface } from '../../config/interfaces/IResponse.interface'
import { IUserRequestBodyInterface } from '../../config/interfaces/IUserRequestBody.interface'
import { useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import api from '../../config/api'
import { IPostInterface } from '../../config/interfaces/IPost.interface'

const EditPost = () => {
	const [post, setPost] = useState<IPostInterface>()
	const { id } = useParams()
	const [content, setContent] = useState<string>('')
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
		getPostDetails()
	}, [])
	async function sendData(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const requestBody = {
			content,
            groupId:post?.groupId
		}
		try {
			const response: IResponseInterface<IPostInterface> =
				await api<IPostInterface>({
					url: `/api/posts/${id}`,
					method: 'PUT',
					body: JSON.stringify(requestBody),
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
                            value={content}
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
                <NavLink to={`/group/list`}>
                    <Button variant="contained" type="submit">
                        Post
                    </Button>
                    </NavLink>
                </CardActions>
            </form>
        </Card>
    </div>
</div>
)
}
export default EditPost
