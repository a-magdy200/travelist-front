import { useState, useEffect } from 'react'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import * as React from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Loader from '../../components/Loader'
import Grid from '@mui/material/Grid'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import { NavLink, Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete'
import CloseIcon from '@mui/icons-material/Close'
import { IResponseInterface } from '../../config/interfaces/IResponse.interface'
import { IUserRequestBodyInterface } from '../../config/interfaces/IUserRequestBody.interface'
import { useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import api from '../../config/api'
import { IPostInterface } from '../../config/interfaces/IPost.interface'
import { IPostShowProps } from '../../config/interfaces/IPostShowProps.interface'
const DeletePost = () => {
	const { id } = useParams()
	const navigate = useNavigate()
	const location = useLocation()
	type LocationState = { groupId: any }
	const { groupId } = location.state as LocationState
	async function sendData(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		try {
			const response: IResponseInterface<IPostInterface> =
				await api<IPostInterface>({
					url: `/api/posts/${id}`,
					method: 'DELETE',
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
								<h2> Are you sure to delete this post?</h2>
							</div>
							<br />
						</CardContent>
						<CardActions>
							<Button variant="contained" type="submit"  sx={{ mx: "auto" }}>
								Delete
							</Button>
						</CardActions>
					</form>
				</Card>
			</div>
		</div>
	)
}
export default DeletePost
