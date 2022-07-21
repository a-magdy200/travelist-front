import Loader from '../Loader'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent/CardContent'
import CardActions from '@mui/material/CardActions/CardActions'
import { NavLink } from 'react-router-dom'
import { ICountryReviewShowProps } from '../../config/interfaces/ICountryReviewShowProps.interface'

const ListCountriesReviewsComponent = ({
	countryReview,
}: ICountryReviewShowProps) => {
	return (
		<div>
			{countryReview ? (
				<div>
					<Card>
						<CardContent className="bottom">
							<h2 className="header">{countryReview.country.name}</h2>

							<Grid
								container
								direction="column"
								spacing={2}
								xs={10}
								lg={8}
								mb={3}
							>
								<Grid item xs={6}>
									Hotel Review : {countryReview.review}
								</Grid>

								<Grid item xs={6}>
									Review Rating : {countryReview.rating}
								</Grid>
							</Grid>
						</CardContent>

						<CardActions className="bottom">
							{/* <NavLink to={`/countryReview/show/${countryReview.country.id}`}>
								{' '}
								<Button className="createButton" variant="contained">
									Show Country Reviews
								</Button>
							</NavLink> */}
							<NavLink to={`/countryReview/delete/${countryReview.id}`}>
								{' '}
								<Button className="createButton" variant="contained">
									Delete
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
export default ListCountriesReviewsComponent
