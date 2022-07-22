import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { NavLink } from 'react-router-dom'
import { IProgramShowProps } from '../../config/interfaces/IProgramShowProps.interface'
import Rating from '@mui/material/Rating'
import * as React from 'react'
const ProgramCard = ({ program }: IProgramShowProps) => {
	const [rate, setRate] = React.useState<number>(0)
	return (
		<Card sx={{ maxWidth: 1000, minWidth: 345, m: 2 }}>
			<CardMedia
				component="img"
				height="140"
				image={`http://localhost:4000/${program.cover_picture}`}
				alt="program Cover"
			/>
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					{program.name}
				</Typography>
				<Typography gutterBottom variant="h6" component="div">
					Price:{program.price}
				</Typography>
				<Rating name="read-only" value={program.average_rate} readOnly />
			</CardContent>
			<CardActions>
				<NavLink to={`/program/show/user/${program.id}`}>
					{' '}
					<Button size="small">More Details</Button>
				</NavLink>
			</CardActions>
		</Card>
	)
}
export default ProgramCard
