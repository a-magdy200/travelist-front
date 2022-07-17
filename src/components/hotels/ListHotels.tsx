import Loader from '../Loader'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent/CardContent'
import CardActions from '@mui/material/CardActions/CardActions'
import { NavLink } from 'react-router-dom'
import { IHotelShowProps } from '../../config/interfaces/IHotelShowProps.interface'

const ListHotelsComponent = ({ hotel }: IHotelShowProps) => {
	return (
		<div>
			{hotel ? (
				<div>
					<Card>
						<CardContent className="bottom">
							<h2 className="header">{hotel.name}</h2>

							<Grid
								container
								direction="column"
								spacing={2}
								xs={10}
								lg={8}
								mb={3}
							>
								<Grid item xs={6}>
									Hotel located in Country : {hotel.country?.name}
								</Grid>

								<Grid item xs={6}>
									Hotel Address : {hotel.address}
								</Grid>
							</Grid>
						</CardContent>

						<CardActions className="bottom">
							<NavLink to={`/hotel/show/${hotel.id}`}>
								{' '}
								<Button className="createButton" variant="contained">
									Show Details
								</Button>
							</NavLink>
						</CardActions>
					</Card>
					<div>
						<p></p>
					</div>
				</div>
			) : (
				<Loader />
			)}
		</div>
	)
}
export default ListHotelsComponent
