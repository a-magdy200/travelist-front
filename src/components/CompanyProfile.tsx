import Profile from './Profile'
import Company from './Company'
import Stack from '@mui/material/Stack'

const TravelerProfile = () => {
	return (
		<Stack
			direction="column"
			spacing={2}
			display="flex"
			// justifyContent="center"
			alignItems="center"

		>
			<>
				<Profile />
				<Company />
			</>
		</Stack>
	)
}

export default TravelerProfile
