import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../config/api'
import { IResponseInterface } from '../../config/interfaces/IResponse.interface'
import { IHotelReview } from '../../config/interfaces/IHotelReview.interface'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CustomInputField from '../../components/Form/CustomInputField'
import Button from '@mui/material/Button'
import { IHotelReviewRequestBody } from '../../config/interfaces/IHotelReviewRequestBody.interface'
import { toast } from 'react-toastify'
import Loader from '../../components/Loader'
import DisplayErrorsList from '../../components/DisplayErrors/DisplayErrorsList'

interface Test {
	hotelId: number
}

const CreateHotelReviews = ({ hotelId }: Test) => {
	const [review, setReview] = useState('')
	const [rating, setRating] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [errors, setErrors] = useState([])

	async function sendData(e: any) {
		e.preventDefault()
		toast.info('Creating Review....')
		setErrors([])
		setIsLoading(true)
		try {
			const requestBody: IHotelReviewRequestBody = {
				review,
				rating,
				hotelId,
			}

			const response: IResponseInterface<IHotelReview> =
				await api<IHotelReview>({
					url: `/api/hotel_reviews/create`,
					method: 'POST',
					body: JSON.stringify(requestBody),
				})

			if (response.success) {
				if (response.data) {
					toast.success('Created Successfully')
					// refresh page
					// reload page
				}
			}
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
		<div className="container">
			<div>
				<Card sx={{ maxWidth: 700 }}>
					<form onSubmit={sendData}>
						<CardContent>
							<h2>Add Your Review</h2>
							<DisplayErrorsList errors={errors} />
							<div>
								<CustomInputField
									type={'text'}
									label={'Review Content'}
									value={review}
									setValue={setReview}
								/>
							</div>
							<br />

							<div>
								<CustomInputField
									type={'number'}
									label={'Review Rating'}
									value={rating}
									setValue={setRating}
								/>
							</div>
						</CardContent>

						<CardActions>
							<Button variant="contained" type="submit">
								Create Review
							</Button>
						</CardActions>
					</form>
				</Card>
			</div>
		</div>
	)
}
export default CreateHotelReviews
