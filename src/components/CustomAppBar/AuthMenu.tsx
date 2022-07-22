import MenuItem from "@mui/material/MenuItem";
import UserIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import LogoutIcon from "@mui/icons-material/Logout";
import { StyledMenu } from "../styled/header_styled_components";
import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { IMenuProps } from "../../config/interfaces/IMenuProps";

const AuthMenu = ({ anchorEl, handleClose }: IMenuProps) => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const open = Boolean(anchorEl);
  const navigateTo = (to: string) => {
    handleClose();
    navigate(to);
  };
  const handleLogout = () => {
    handleClose();
    logout();
    navigateTo("/login");
  };

  return (
    <StyledMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
      <MenuItem onClick={() => navigateTo('/profile')}>
        <UserIcon />
        My Profile
      </MenuItem>
      <MenuItem onClick={() => navigateTo(`/profile/edit`)}>
        <EditIcon />
        Edit Profile
      </MenuItem>
      <Divider sx={{ my: 0.5 }} />
      <MenuItem onClick={handleLogout}>
        <LogoutIcon />
        Logout
      </MenuItem>
    </StyledMenu>
  );
};
export default AuthMenu;
