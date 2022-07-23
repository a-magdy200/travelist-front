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
import useAuth from '../../hooks/useAuth'

const CycleCardComponent = ({ cycle }: ICycleShowProps) => {
	const [rate, setRate] = React.useState<number>(0)
	const {user}=useAuth()
	
	
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
				{
					user.type==='traveler'?
				
				<NavLink to={`/cycle/book/${cycle.id}`}>
					{' '}
					<Button size="small">Book</Button>
				</NavLink>
				:
				<></>
               }
			</CardActions>
		</Card>
	)
}
export default CycleCardComponent
