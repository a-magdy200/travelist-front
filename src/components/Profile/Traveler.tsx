import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import EditMenu from './EditMenu'

const Traveler = () => {
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
					Female
				</Grid>
				<Grid item xs={6}>
					Date of Birth:
				</Grid>
				<Grid item xs={6}>
					24-11-1996
				</Grid>
				<Grid item xs={6}>
					Natioal Id:
				</Grid>
				<Grid item xs={6}>
					12345678912345
				</Grid>
				<Grid item xs={6}>
					Guide:
				</Grid>
				<Grid item xs={6}>
					No
				</Grid>
			</Grid>

			<EditMenu />
			</Stack>

	)
}

export default Traveler
