import MenuItem from '@mui/material/MenuItem'
import LoginIcon from '@mui/icons-material/LoginOutlined'
import { StyledMenu } from '../styled/header_styled_components'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { IMenuProps } from '../../config/interfaces/IMenuProps'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'
const GuestMenu = ({ anchorEl, handleClose }: IMenuProps) => {
	const navigate = useNavigate()
	const open = Boolean(anchorEl)
	const navigateTo = (to: string) => {
		handleClose()
		navigate(to)
	}
	return (
		<StyledMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
			<MenuItem onClick={() => navigateTo('/login')}>
				<LoginIcon />
				Login
			</MenuItem>
			<MenuItem onClick={() => navigateTo('/register')}>
				<PersonAddAltIcon />
				Register
			</MenuItem>
		</StyledMenu>
	)
}
export default GuestMenu
