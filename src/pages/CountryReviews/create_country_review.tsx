import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../../config/api'
import { IResponseInterface } from '../../config/interfaces/IResponse.interface'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CustomInputField from '../../components/Form/CustomInputField'
import Button from '@mui/material/Button'
import { ICountryReviewRequestBody } from '../../config/interfaces/ICountryReviewRequestBody.interface'
import { ICountryReview } from '../../config/interfaces/ICountryReview.interface'
import Rating from '@mui/material/Rating'
import Typography from '@mui/material/Typography'

// interface Test {
// 	countryId: number
// }

const CreateCountryReviews = () => {
	const [review, setReview] = useState('')
	const [rating, setRating] = useState('')
	const navigate = useNavigate()
	let { id } = useParams()
	let countryId: number = 0

	if (typeof id !== 'undefined') {
		countryId = +id
	}

	async function sendData(e: any) {
		e.preventDefault()
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
		} catch (error: any) {
			console.log(error)
		}
	}

	return (
		<div className="container">
			<div>
				<Card sx={{ maxWidth: 700 }}>
					<form onSubmit={sendData}>
						<CardContent>
							<h2>Add Your Review</h2>

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
								<CustomInputField
									type={'text'}
									label={'Review Content'}
									value={review}
									setValue={setReview}
								/>
							</div>
							<br />

							{/* <div>
								<CustomInputField
									type={'number'}
									label={'Review Rating'}
									value={rating}
									setValue={setRating}
								/>
							</div> */}
						</CardContent>

						<CardActions sx={{ justifyContent: 'center' }}>
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
export default CreateCountryReviews
