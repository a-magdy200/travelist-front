import { ICompanyShowProps } from '../../config/interfaces/ICompanyShowProps.interface'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import { NavLink } from 'react-router-dom'
import Button from '@mui/material/Button'

const CompanyDetailsComponent = ({ company }: ICompanyShowProps) => {
	return (
		<div>
			{company ? (
				<Card sx={{ maxWidth: 845, ml: 6 }}>
					<CardMedia
						component="img"
						height="200"
						image={`http://localhost:4000/${company.cover_picture}`}
						alt="company cover"
					/>
					<CardContent>
						<Typography gutterBottom variant="h5" component="div">
							{company.user.name}
						</Typography>
						<Typography variant="body2" color="text.secondary">
							<Grid
								id="1"
								container
								direction="column"
								spacing={2}
								xs={12}
								lg={8}
								m={3}
							>
								<Grid item xs={6}>
									email : {company.user.email}
								</Grid>
								<Grid item xs={6}>
									Description : {company.description}
								</Grid>
								<Grid item xs={6}>
									address: {company.user.address}
								</Grid>
								<Grid item xs={6}>
									average_rate : {company.average_rate}
								</Grid>
							</Grid>
						</Typography>
					</CardContent>
					<CardActions>
						<NavLink to={`/company/list`}>
							{' '}
							<Button className="createButton" variant="contained">
								Back
							</Button>
						</NavLink>
					</CardActions>
				</Card>
			) : (
				<div>Not Found</div>
			)}
		</div>
	)
}
export default CompanyDetailsComponent
