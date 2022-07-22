import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { NavLink } from 'react-router-dom'
import Rating from '@mui/material/Rating'
import * as React from 'react'
import { ICycleShowProps } from '../../config/interfaces/ICycleShowProps.interface'
import { IResponseInterface } from '../../config/interfaces/IResponse.interface'
import { ICycleInterface } from '../../config/interfaces/ICycle.interface'
import api from '../../config/api'
import { IBookCycleRequestBody } from '../../config/interfaces/IBookCycleRequestBody.interface'
import { LoadingButton } from '@mui/lab'
import StripeCheckout from 'react-stripe-checkout'

const CycleCardComponent = ({ cycle }: ICycleShowProps) => {
	const [rate, setRate] = React.useState<number>(0)
	const [isLoading, setIsLoading] = React.useState(false)
	const bookCycle = async (token: any) => {
		try {
			if (cycle.id) {
				const requestBody: IBookCycleRequestBody = {
					cycleId: cycle.id,
					token,
				}

				const response: IResponseInterface<ICycleInterface> =
					await api<ICycleInterface>({
						url: '/api/cycles/book',
						method: 'POST',
						body: JSON.stringify(requestBody),
					})
				if (response.success) {
					alert('booked successfully')
				}
			}
		} catch (error: any) {
			alert('you booked before')
			console.log(JSON.stringify(error))
		}
	}
	const isDisabled = (): boolean => {
		return isLoading
	}
	return (
		<Card>
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					{cycle.name}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					Departure Date {cycle.departure_date}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					Return Date {cycle.return_date}
				</Typography>
				<Rating name="read-only" value={cycle.average_rate} readOnly />
			</CardContent>
			<CardActions>
				<NavLink to={`/cycle/show/${cycle.id}`}>
					{' '}
					<Button size="small">Show More</Button>
				</NavLink>
				<StripeCheckout
					stripeKey="pk_test_51LNL5KAolBbZGsicA33sip9053jvrTpZvK6nzMAts5ZwJPvYJZlAD0yPBptJdrAACPVpMIMQ2QxYTXh9HAz0Vnpf0062y97oQ2"
					token={bookCycle}
					name="book"
				/>
			</CardActions>
		</Card>
	)
}
export default CycleCardComponent
