import SidebarItem from "./SidebarItem";
import { HomeOutlined } from "@ant-design/icons";
import { GroupOutlined } from "@mui/icons-material";
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import * as React from "react";

const CompanySidebar = () => {
  return (
    <>
      <SidebarItem
        title={'Programs'}
        icon={<HomeOutlined />}
        to={'/program/list'}
      />
      <SidebarItem
        title={'Countries'}
        icon={<PublicOutlinedIcon />}
        to={'/country/list'}
      />
      <SidebarItem
        title={'Groups'}
        icon={<GroupOutlined />}
        to={'/group/list'}
      />
      <SidebarItem
        title={'List Bookings'}
        icon={<HomeOutlined />}
        to={'/booking/list'}
      />
       <SidebarItem
        title={'List cycles'}
        icon={<HomeOutlined />}
        to={'/cycle/list'}
      />
     
    </>
  )
}
export default CompanySidebar;
