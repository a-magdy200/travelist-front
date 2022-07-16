import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import EditMenu from './EditMenu'
import { ITravelerShowProps } from '../../config/interfaces/ITravelerShowProps.interface'

const Traveler = ({ traveler }: ITravelerShowProps)   => {
	return (
		<Stack
		direction="column"
		spacing={2}
		display="flex"
		// justifyContent="center"
		alignItems="center"

	>
			<Grid container spacing={2} xs={10} lg={8} mb={3}>
				<Grid item xs={6}>
					Gender:
				</Grid>
				<Grid item xs={6}>
					{traveler.gender}
				</Grid>
				<Grid item xs={6}>
					Date of Birth:
				</Grid>
				<Grid item xs={6}>
				{traveler.date_of_birth}
				</Grid>
				<Grid item xs={6}>
					National Id:
				</Grid>
				<Grid item xs={6}>
				{traveler.national_id}
				</Grid>
				<Grid item xs={6}>
					Guide:
				</Grid>
				<Grid item xs={6}>
				{traveler.is_guide}
				</Grid>
			</Grid>

			{/* <EditMenu company = {company}/> */}
			</Stack>

	)
}

export default Traveler
