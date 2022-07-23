import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import * as React from 'react'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import { useNavigate } from 'react-router-dom'
import { IResponseInterface } from '../../config/interfaces/IResponse.interface'
import { useParams } from 'react-router-dom'
import api from '../../config/api'
import { ICompanyReview } from '../../config/interfaces/ICompanyReview.interface'
import { useState } from 'react'
import { toast } from 'react-toastify'
import DisplayErrorsList from '../../components/DisplayErrors/DisplayErrorsList'
import Loader from '../../components/Loader'

const DeleteCompanyReview = () => {
	const { id } = useParams()
	const navigate = useNavigate()
	const [errors, setErrors] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	async function sendData(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		toast.info('Deleting Review....')
		setErrors([])
		setIsLoading(true)
		try {
			const response: IResponseInterface<ICompanyReview> =
				await api<ICompanyReview>({
					url: `/api/company_reviews/delete/${id}`,
					method: 'DELETE',
				})

			if (response.success) {
				// console.log(response)
				navigate('/companyReview/list')
			}
			toast.success('Deleted Successfully')
		} catch (error: any) {
			setErrors(error?.response?.data?.errors || [])
			toast.error('An error has occurred')
		}
		setIsLoading(false)
	}
	if (isLoading) {
		return <Loader />
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
							<DisplayErrorsList errors={errors} />
							<div>
								<h2> Are you sure you want to delete this?</h2>
							</div>
							<br />
						</CardContent>
						<CardActions>
							<Button variant="contained" type="submit" sx={{ mx: 'auto' }}>
								Delete
							</Button>
						</CardActions>
					</form>
				</Card>
			</div>
		</div>
	)
}
export default DeleteCompanyReview
