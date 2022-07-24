import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../../config/api'
import { IResponseInterface } from '../../config/interfaces/IResponse.interface'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import { ICountryReviewRequestBody } from '../../config/interfaces/ICountryReviewRequestBody.interface'
import { ICountryReview } from '../../config/interfaces/ICountryReview.interface'
import Rating from '@mui/material/Rating'
import Typography from '@mui/material/Typography'
import { toast } from 'react-toastify'
import Loader from '../../components/Loader'
import DisplayErrorsList from '../../components/DisplayErrors/DisplayErrorsList'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

const CreateCountryReviews = () => {
	const [review, setReview] = useState('')
	const [rating, setRating] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [errors, setErrors] = useState([])
	const navigate = useNavigate()
	let { id } = useParams()
	let countryId: number = 0

	if (typeof id !== 'undefined') {
		countryId = +id
	}

	async function sendData(e: any) {
		e.preventDefault()
		toast.info('Creating Review....')
		setErrors([])
		setIsLoading(true)
		try {
			const requestBody: ICountryReviewRequestBody = {
				review,
				rating,
				countryId,
			}

			const response: IResponseInterface<ICountryReview> =
				await api<ICountryReview>({
					url: `/api/country_reviews/create`,
					method: 'POST',
					body: JSON.stringify(requestBody),
				})

			if (response.success) {
				if (response.data) {
					console.log(response.data)
					navigate(`/country/show/${id}`)
				}
			}
			toast.success('Created Review Successfully')
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
		<Container
			sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}
		>
			<Box>
				<Card sx={{ width: 700 }}>
					<form onSubmit={sendData}>
						<CardContent>
							<h2>Add Your Review</h2>
							<DisplayErrorsList errors={errors} />
							<Typography component="legend">Star rating</Typography>
							<Rating
								name="simple-controlled"
								value={+rating}
								onChange={(event, newValue) => {
									setRating(newValue!.toString())
								}}
							/>
							<br />
							<br />

							<div>
								<TextField
									type={'text'}
									label={'Review Content'}
									variant="outlined"
									fullWidth
									multiline
									required
									value={review}
									onChange={(
										event: React.ChangeEvent<
											HTMLInputElement | HTMLTextAreaElement
										>
									) => setReview(event.target.value)}
								/>
							</div>
							<br />
						</CardContent>

						<CardActions sx={{ justifyContent: 'center' }}>
							<Button variant="contained" type="submit">
								Create Review
							</Button>
						</CardActions>
					</form>
				</Card>
			</Box>
		</Container>
	)
}
export default CreateCountryReviews
