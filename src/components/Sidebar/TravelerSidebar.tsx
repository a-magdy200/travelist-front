import SidebarItem from "./SidebarItem";
import { HomeOutlined } from "@ant-design/icons";
import { GroupOutlined } from "@mui/icons-material";
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import * as React from "react";

const TravelerSidebar = () => {
  return (
    <>
      <SidebarItem
        title={'Programs'}
        icon={<HomeOutlined />}
        to={'/program/all'}
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
        title={'Hotels'}
        icon={<HomeOutlined />}
        to={'/hotel/list'}
      />
        <SidebarItem
          title={'Companies'}
          icon={<HomeOutlined />}
          to={'/company/list'}
        />
      <SidebarItem
        title={'My Posts'}
        icon={<HomeOutlined />}
        to={'/myPosts'}
      />
      <SidebarItem
        title={'My Bookings'}
        icon={<HomeOutlined />}
        to={'/traveler/booking'}
      />
      <SidebarItem
        title={'My Friends'}
        icon={<HomeOutlined />}
        to={'/friends'}
      />
      <SidebarItem
        title={'Received Friend Requests'}
        icon={<HomeOutlined />}
        to={'/traveler/friendrequests'}
      />
      <SidebarItem
      title={'Sent Friend Requests'}
      icon={<HomeOutlined />}
      to={'/traveler/sentrequests'}
    />
    </>
  )
}
export default TravelerSidebar;
