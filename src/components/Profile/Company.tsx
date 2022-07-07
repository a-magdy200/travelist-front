import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import EditMenu from "./EditMenu";

const Company = () => {
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
					Description:
				</Grid>
				<Grid item xs={6}>
					ghhhghgsjjaahjjjjjjhbb
				</Grid>
				<Grid item xs={6}>
					Rate:
				</Grid>
				<Grid item xs={6}>
					3.8
				</Grid>
				<Grid item xs={6}>
					Phone:
				</Grid>
				<Grid item xs={6}>
					1234567
				</Grid>
			</Grid>

			<EditMenu />
		</Stack>
	)
}

export default Company
