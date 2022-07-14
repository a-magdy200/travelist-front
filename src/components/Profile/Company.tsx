import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import EditMenu from './EditMenu'
import Loader from '../Loader'
import { ICompanyShowProps } from '../../config/interfaces/ICompanyShowProps.interface'
const Company = ({ company }: ICompanyShowProps) => {
	return (
		<div>
			{company ? (
				<Stack
					direction="column"
					spacing={2}
					display="flex"
					alignItems="center"
				>
					{/* <ProfilePictureChanger profile_picture={company.cover_picture} /> */}
					<Grid container spacing={2} xs={10} lg={8} mb={3}>
						<Grid item xs={6}>
							Description:
						</Grid>
						<Grid item xs={6}>
							{company.description}
						</Grid>
						<Grid item xs={6}>
							Average Rate:
						</Grid>
						<Grid item xs={6}>
							{company.average_rate}
						</Grid>
						<Grid item xs={6}>
							Ratings count:
						</Grid>
						<Grid item xs={6}>
							{company.ratings_count}
						</Grid>
					</Grid>

				
				</Stack>
			) : (
				<Loader />
			)}
		</div>
	)
}

export default Company
