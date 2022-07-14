import React from 'react';
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import EditIcon from '@mui/icons-material/Edit'
import KeyIcon from '@mui/icons-material/Key'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import {useNavigate} from "react-router-dom";
import {StyledMenu} from "../styled/header_styled_components";
import { ICompanyShowProps } from '../../config/interfaces/ICompanyShowProps.interface'
import { IUserShowProps } from '../../config/interfaces/IUserShowProps.interface';

const EditMenu = ({ user }: IUserShowProps) => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget)
	}
	const handleClose = () => {
		setAnchorEl(null)
	}
	const navigate = useNavigate();
	const navigateToRoute = (route: string) => {
		handleClose();
		navigate(route);
	}
	return (
		<div>
			<Button
				id="demo-customized-button"
				aria-controls={open ? 'demo-customized-menu' : undefined}
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
				variant="contained"
				disableElevation
				onClick={handleClick}
				endIcon={<KeyboardArrowDownIcon />}
			>
				<EditIcon />
				Options
			</Button>
			<StyledMenu
				id="demo-customized-menu"
				MenuListProps={{
					'aria-labelledby': 'demo-customized-button',
				}}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
			>
				<MenuItem onClick={() => navigateToRoute(`/editUser`)} disableRipple>
					<EditIcon />
					Edit Account
				</MenuItem>
				<MenuItem onClick={() => navigateToRoute(`/editCompany`)} disableRipple>
					<EditIcon />
					Edit Profile
				</MenuItem>
				<MenuItem onClick={() => navigateToRoute("/editpassword")}disableRipple>
					<KeyIcon />
					Change Password
				</MenuItem>
			</StyledMenu>
		</div>
	)
}
export default EditMenu
