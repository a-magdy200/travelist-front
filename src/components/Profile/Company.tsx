import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import EditMenu from './EditMenu'
import Loader from '../Loader'
import Typography from '@mui/material/Typography'
import ProfilePictureChanger from "./ProfilePictureChanger";
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
					<Typography variant="h3" component="div" gutterBottom>
						Profile
					</Typography>
					<ProfilePictureChanger profile_picture ={company.user.profile_picture} />
					<Grid container spacing={2} xs={10} lg={8} mb={3}>
						<Grid item xs={6}>
							Name:
						</Grid>
						<Grid item xs={6}>
							{company.user.name}
						</Grid>
						<Grid item xs={6}>
							Email:
						</Grid>
						<Grid item xs={6}>
							{company.user.email}
						</Grid>
						<Grid item xs={6}>
							Type:
						</Grid>
						<Grid item xs={6}>
							{company.user.type}
						</Grid>
						<Grid item xs={6}>
							Location:
						</Grid>
						<Grid item xs={6}>
							{company.user.address}
						</Grid>
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
						{/* <Grid item xs={6}>
					Phone:
				</Grid>
				<Grid item xs={6}>
				
				</Grid> */}
					</Grid>

					<EditMenu />
				</Stack>
			) : (
				<Loader />
			)}
		</div>
	)
}

export default Company
