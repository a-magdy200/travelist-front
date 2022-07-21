import useAuth from '../hooks/useAuth'
import UserRoutes from './UserRoutes'
import GuestRoutes from './GuestRoutes'

const Navigation = () => {
	const { isLoggedIn } = useAuth()
	return isLoggedIn ? <UserRoutes /> : <GuestRoutes />
}
export default Navigation
