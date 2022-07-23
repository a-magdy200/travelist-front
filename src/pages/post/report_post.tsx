import { useState, useEffect } from 'react'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import * as React from 'react'
import CardActions from '@mui/material/CardActions'
import TextField from '@mui/material/TextField/TextField'
import CardContent from '@mui/material/CardContent'
import { NavLink, Link } from 'react-router-dom'
import TextareaAutosize from '@mui/base/TextareaAutosize'
import { useNavigate } from 'react-router-dom'
import { IResponseInterface } from '../../config/interfaces/IResponse.interface'
import { useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import api from '../../config/api'
import { IPostReportInterface } from '../../config/interfaces/IPostReport.interface'
const ReportPost = () => {
	const { id } = useParams()
	const navigate = useNavigate()
	const location = useLocation()
	const [reason, setReason] = useState<string>('')
	type LocationState = { groupId: any }
	const { groupId } = location.state as LocationState
	async function sendData(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const requestBody = {
			postId: id,
			reason,
		}
		try {
			const response: IResponseInterface<IPostReportInterface> =
				await api<IPostReportInterface>({
					url: `/api/posts_reports`,
					method: 'Post',
					body: JSON.stringify(requestBody),
				})

			if (response.success) {
				navigate(`/group/show/${groupId}`)
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
				<Card sx={{ maxWidth: 700 }} style={{ minHeight: '25vh' }}>
					<form onSubmit={sendData}>
						<CardContent>
							<div>
								<h2> Are you sure to report this post?</h2>
							</div>
							<br />
							<div>
								<TextareaAutosize
									maxRows={8}
									aria-label="maximum height"
									value={reason}
									placeholder="please enter why do you want to report?"
									onChange={(e) => {
										setReason(e.target.value)
									}}
									style={{ width: 300, height: 100 }}
								/>
							</div>
						</CardContent>
						<CardActions>
							<Button variant="contained" type="submit" sx={{ mx: 'auto' }}>
								Report
							</Button>
						</CardActions>
					</form>
				</Card>
			</div>
		</div>
	)
}
export default ReportPost
