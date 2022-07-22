import useAppContext from "../../hooks/useAppContext";
import {SyntheticEvent, useEffect, useState} from "react";
import useAuth from "../../hooks/useAuth";
import _ from "lodash";
import Loader from "../../components/Loader";
import Box from "@mui/material/Box";
import {Grid, Tab, Tabs} from "@mui/material";
import BasicInfoForm from "../../components/Profile/BasicInfoForm";
import ChangePasswordForm from "../../components/Profile/ChangePasswordForm";
import EditCompany from "./EditCompany";
import EditTraveler from "./EditTraveler";

const EditProfile = () => {
  const {getUser, user} = useAuth();
  const {setPageTitle} = useAppContext();
  const [isLoading, setIsLoading] = useState(true);
  const [tab, setTab] = useState(0);
  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };
  useEffect(() => {
    setPageTitle("Edit Profile");
    getUser().then(() => {
      setIsLoading(false);
    })
  }, []);
  const renderTabContent = () => {
    switch (tab) {
      case 0:
        return <BasicInfoForm />
      case 1:
        return user.type === 'company' ? <EditCompany /> : <EditTraveler />
      case 2:
        return <ChangePasswordForm />
      default:
        return null;
    }
  }
  if (isLoading) {
    return <Loader/>;
  }
  return (
    <Box p={2}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={tab}
            onChange={handleChange}
            sx={{borderRight: 1, borderColor: 'divider'}}
          >
            <Tab sx={{alignSelf:'start'}} label="Basic Information"/>
            <Tab sx={{alignSelf:'start'}} label={user.type === 'company' ? "Company Information" : "Traveler Information"}/>
            <Tab sx={{alignSelf:'start'}} label="Change Password"/>
          </Tabs>
        </Grid>
        <Grid item xs={8}>
          {renderTabContent()}
        </Grid>
      </Grid>
    </Box>
  )
}
export default EditProfile;
