import Loader from '../Loader'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent/CardContent'
import CardActions from '@mui/material/CardActions/CardActions'
import { NavLink } from 'react-router-dom'
import { ICompanyReviewShowProps } from '../../config/interfaces/ICompanyReviewShowProps.interface'

const ListCompaniesReviewsComponent = ({
	companyReview,
}: ICompanyReviewShowProps) => {
	return (
		<div>
			{companyReview ? (
				<div>
					<Card>
						<CardContent className="bottom">
							{/* <h2 className="header">{companyReview.company.user.name}</h2> */}

							<Grid
								container
								direction="column"
								spacing={2}
								xs={10}
								lg={8}
								mb={3}
							>
								<Grid item xs={6}>
									Hotel Review : {companyReview.review}
								</Grid>

								<Grid item xs={6}>
									Review Rating : {companyReview.rating}
								</Grid>
							</Grid>
						</CardContent>

						<CardActions className="bottom">
							{/* <NavLink to={`/companyReview/show/${companyReview.company.id}`}>
								{' '}
								<Button className="createButton" variant="contained">
									Show Company Reviews
								</Button>
							</NavLink> */}
							<NavLink to={`/companyReview/delete/${companyReview.id}`}>
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
export default ListCompaniesReviewsComponent
