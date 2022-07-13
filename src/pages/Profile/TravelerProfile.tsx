import Traveler from '../../components/Profile/Traveler'
import Stack from '@mui/material/Stack'
import UserBaseData from './UserBaseData'

const TravelerProfile = () => {
	return (
		<Stack
			direction="column"
			spacing={2}
			display="flex"
			alignItems="center"

		>
			<>
				<UserBaseData />
				<Traveler />
			</>
		</Stack>
	)
}

export default TravelerProfile
