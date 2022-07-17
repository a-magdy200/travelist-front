import TravelerData from './TravelerData'
import Stack from '@mui/material/Stack'
import UserBaseData from './UserBaseData'

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
				<UserBaseData />
				<TravelerData/>
			</>
		</Stack>
	)
}

export default TravelerProfile
