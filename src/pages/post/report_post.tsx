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
import Box from "@mui/material/Box";
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
		<Card variant={"outlined"}>
			<CardContent>
				<form onSubmit={sendData}>
					<Box p={4} display={"flex"} flexDirection={"column"} alignItems={"center"}>
						<h2>Report post</h2>
						<Box mb={2} width={"100%"}>
							<TextField
								multiline={true}
								fullWidth={true}
								rows={8}
								label={"Content"}
								variant={"outlined"}
								aria-label="maximum height"
								value={reason}
								placeholder="please enter why do you want to report?"
								onChange={(e) => {
									setReason(e.target.value)
								}}
							/>
						</Box>
						<Button variant="contained" type="submit">
							Report
						</Button>
					</Box>
				</form>
			</CardContent>
		</Card>
	)
}
export default ReportPost
