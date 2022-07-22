import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Typography from '@mui/material/Typography'
import { AppBar } from '../styled/header_styled_components'
import React from 'react'
import useSidebarContext from '../../hooks/useSidebarContext'
import useAppContext from '../../hooks/useAppContext'
import { Avatar, Button } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import defaultImage from '../../assets/images/default_avatar.jpg'
import Box from '@mui/material/Box'
import useAuth from '../../hooks/useAuth'
import AuthMenu from './AuthMenu'
import GuestMenu from './GuestMenu'
import { useNavigate } from 'react-router-dom'
import { APP_NAME } from '../../config/helpers/constants'
import UserNotifications from './UserNotifications'
import config from "../../config/app_config/config";
import SearchField from '../Search/SearchField'

const CustomAppBar = () => {
	const navigate = useNavigate()
	const { isOpen, handleToggle } = useSidebarContext()
	const { pageTitle, setPageTitle } = useAppContext()
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
	const { isLoggedIn, user } = useAuth()
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget)
	}
	const handleClose = () => {
		setAnchorEl(null)
	}
	const navigateToHome = () => {
		setPageTitle(APP_NAME)
		navigate('/')
	}
	return (
		<AppBar position="fixed" open={isOpen && isLoggedIn}>
			<Toolbar>
				{isLoggedIn ? (
					<IconButton
						color="inherit"
						onClick={() => {
							handleToggle(!isOpen)
						}}
						edge="start"
						sx={{
							marginRight: 5,
							...(isOpen && { display: 'none' }),
						}}
					>
						<MenuIcon />
					</IconButton>
				) : null}
				<Box
					display={'flex'}
					alignItems={'center'}
					flexGrow={1}
					justifyContent={'space-between'}
				>
					<Typography variant="h4" noWrap component="div">
						<Button color={'inherit'} onClick={navigateToHome}>
							{pageTitle}
						</Button>
					</Typography>
          <SearchField />
					<div>
						<UserNotifications />
						<Button
							variant="contained"
							disableElevation
							onClick={handleClick}
							endIcon={<KeyboardArrowDownIcon />}
						>
							<Avatar
								alt="User Avatar"
								src={user?.profile_picture ? `${config.apiUrl}/${user.profile_picture}` : undefined}
								color={"primary"}
							>
								{!user?.profile_picture ? (user?.name ? user?.name.substring(0,1) : '') : null}
							</Avatar>
						</Button>
						{isLoggedIn ? (
							<AuthMenu anchorEl={anchorEl} handleClose={handleClose} />
						) : (
							<GuestMenu anchorEl={anchorEl} handleClose={handleClose} />
						)}
					</div>
				</Box>
			</Toolbar>
		</AppBar>
	)
}
export default CustomAppBar
