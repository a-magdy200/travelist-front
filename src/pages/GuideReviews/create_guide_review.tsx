import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../config/api'
import { IResponseInterface } from '../../config/interfaces/IResponse.interface'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CustomInputField from '../../components/Form/CustomInputField'
import Button from '@mui/material/Button'
import { IGuideReview } from '../../config/interfaces/IGuideReview.interface'
import { IGuideReviewRequestBody } from '../../config/interfaces/IGuideReviewRequestBody.interface'

interface Test {
	guideId: number;
}

const CreateGuideReviews = ({guideId}: Test) => {
	const [review, setReview] = useState('')
	const [rating, setRating] = useState('')

	async function sendData(e: any) {
		e.preventDefault()
		try {
			
			const requestBody: IGuideReviewRequestBody = {
				review,
				rating,
				guideId
			}

			const response: IResponseInterface<IGuideReview> =
				await api<IGuideReview>({
					url: `/api/guide_reviews/create`,
					method: 'POST',
					body: JSON.stringify(requestBody),

				})

			if (response.success) {
				if (response.data) {
					console.log(response.data)
					// refresh page
					// reload page
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
export default CreateGuideReviews