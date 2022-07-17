import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import EditMenu from './EditMenu'
import AuthContext from "../../contexts/AuthContext";
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
					<Grid container spacing={2} xs={10} lg={8} mb={3}>
						<Grid item xs={6}>
						Description:
						</Grid>
						<Grid item xs={6}>
							{company.description}
						</Grid>
						<Grid item xs={6}>
						average_rate:
						</Grid>
						<Grid item xs={6}>
						{company.average_rate}
						</Grid>
						<Grid item xs={6}>
						ratings_count:
						</Grid>
						<Grid item xs={6}>
						{company.ratings_count}
						</Grid>				
					</Grid>

					<EditMenu company = {company}/>
					
				</Stack>
			) : (
				<Loader />
			)}
		</div>
	)
}

export default Company
