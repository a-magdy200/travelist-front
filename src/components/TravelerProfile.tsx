import Profile from './Profile'
import Traveler from './Traveler'
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
				<Traveler />
			</>
		</Stack>
	)
}

export default TravelerProfile
