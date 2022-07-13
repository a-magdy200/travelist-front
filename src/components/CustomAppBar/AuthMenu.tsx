import MenuItem from "@mui/material/MenuItem";
import UserIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import LogoutIcon from "@mui/icons-material/Logout";
import {StyledMenu} from "../styled/header_styled_components";
import React from "react";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import {ICompanyInterface} from "../../config/interfaces/ICompany.interface";
import {IMenuProps} from "../../config/interfaces/IMenuProps";
import {IResponseInterface} from '../../config/interfaces/IResponse.interface'
import api from "../../config/api";
const AuthMenu = ({anchorEl, handleClose}: IMenuProps) => {
  const [compProfile, setCompProfile] = useState<ICompanyInterface>()
  const navigate = useNavigate();
  const {logout} = useAuth();
  const open = Boolean(anchorEl);

  const navigateTo = (to: string) => {
    handleClose();
    navigate(to);
  };
  const handleLogout = () => {
    handleClose();
    logout();
    navigateTo('/login')
  };
  // const getMyProfile = async () => {
	// 	try {
	// 		const response: IResponseInterface<ICompanyInterface> =
	// 			await api<ICompanyInterface>({
	// 				url: `/api/companies/profile`,
	// 				method: 'GET',
	// 			})

	// 		if (response.success) {
	// 			if (response.data) {
	// 				setCompProfile(response.data)
	// 			}
	// 		}
	// 	} catch (error: any) {
	// 		console.log(error)
	// 	}
	// }	
  // useEffect(() => {
	// 	getMyProfile()
	// }, [])
  return (
    <StyledMenu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
    >
    
      <MenuItem onClick={() => navigate(`/company`)}>
      <UserIcon />
      My Profile
    </MenuItem>

      <MenuItem onClick={() => navigateTo(`/editUser`)}>
        <EditIcon />
        Edit Profile
      </MenuItem>
      <Divider sx={{ my: 0.5 }} />
      <MenuItem onClick={handleLogout}>
        <LogoutIcon />
        Logout
      </MenuItem>
    </StyledMenu>
  )
}
export default AuthMenu;
