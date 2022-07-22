import SidebarItem from "./SidebarItem";
import { HomeOutlined } from "@ant-design/icons";
import { GroupOutlined } from "@mui/icons-material";
import * as React from "react";

const CompanySidebar = () => {
  return (
    <>
      <SidebarItem
        title={'Programs'}
        icon={<HomeOutlined />}
        to={'/program/all'}
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
    </>
  )
}
export default CompanySidebar;
