import React, { MouseEvent, useState } from 'react'
import NotificationsIcon from '@mui/icons-material/Notifications'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import UserIcon from '@mui/icons-material/Person'
import EditIcon from '@mui/icons-material/Edit'
import { StyledMenu } from '../styled/header_styled_components'
import useAuth from '../../hooks/useAuth'

const UserNotifications = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const { isLoggedIn } = useAuth()
	const open = Boolean(anchorEl)
	const handleClick = (event: MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget)
	}
	const handleClose = () => {
		setAnchorEl(null)
	}
	return (
		<>
			<IconButton onClick={handleClick}>
				<NotificationsIcon />
			</IconButton>
			<StyledMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
				{isLoggedIn ? (
					<>
						<MenuItem>
							<UserIcon />
							My Notifications
						</MenuItem>
						<MenuItem>
							<EditIcon />
							My Messages
						</MenuItem>
					</>
				) : (
					<MenuItem>
						<EditIcon />
						You must login first
					</MenuItem>
				)}
			</StyledMenu>
		</>
	)
}
export default UserNotifications
