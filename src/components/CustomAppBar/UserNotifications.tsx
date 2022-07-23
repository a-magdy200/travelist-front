import React, { MouseEvent, useState } from 'react'
import NotificationsIcon from '@mui/icons-material/Notifications'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import UserIcon from '@mui/icons-material/Person'
import EditIcon from '@mui/icons-material/Edit'
import { StyledMenu } from '../styled/header_styled_components'
import useAuth from '../../hooks/useAuth'
import { useNavigate } from "react-router-dom";

const UserNotifications = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const { isLoggedIn } = useAuth()
	const navigate = useNavigate();
	const open = Boolean(anchorEl)
	const handleClick = (event: MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget)
	}
	const handleClose = () => {
		setAnchorEl(null)
	}
	const navigateTo = (path: string) => {
		handleClose();
		navigate(path);
	}
	return (
		<>
			<IconButton onClick={handleClick}>
				<NotificationsIcon />
			</IconButton>
			<StyledMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
				{isLoggedIn ? (
					<>
						<MenuItem onClick={() => navigateTo('/notifications')}>
							<UserIcon />
							My Notifications
						</MenuItem>
						<MenuItem onClick={() => navigateTo('/chat')}>
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
