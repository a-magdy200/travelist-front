import { SyntheticEvent, useEffect, useState } from "react";
import useAppContext from "../../hooks/useAppContext";
import { Avatar, Button, Grid, Tab, Tabs } from "@mui/material";
import {PhotoCamera} from "@mui/icons-material";
import useAuth from "../../hooks/useAuth";
import Typography from "@mui/material/Typography";
import ListDetails from "../../components/ListDetails/ListDetails";
import Loader from "../../components/Loader";
import config from "../../config/app_config/config";
import Box from "@mui/material/Box";
import {EditOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import CompanyData from "./CompanyData";
import TravelerData from "./TravelerData";
import { IResponseInterface } from "../../config/interfaces/IResponse.interface";
import { ICompanyInterface } from "../../config/interfaces/ICompany.interface";
import api from "../../config/api";
const ShowProfile = () => {
  const {getUser, user, updateCoverPicture, updateProfilePicture} = useAuth();
  const {setPageTitle} = useAppContext();
  const [tab, setTab] = useState(0);
  const [coverImage, setCoverImage] = useState('');
  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const getCompanyProfile = async () => {
    try {
      const response: IResponseInterface<ICompanyInterface> =
        await api<ICompanyInterface>({
          url: `/api/companies/profile`,
        })

      if (response.success) {
        if (response.data) {
          setCoverImage(response.data.cover_picture)
        }
      }
    } catch (error: any) {
      console.log(error)
    }
  }
  useEffect(() => {
    setPageTitle("My Profile");
    getUser().then(async () => {
      if (user.type === 'company') {
        await getCompanyProfile();
      }
      setIsLoading(false);
    })
  }, []);
  const renderTabContent = () => {
    let details = {};
    switch (tab) {
      case 0:
        details = {
          name: user.name,
          email: user.email,
          address: user.address,
          type: user.type,
        };
        return <ListDetails details={details} />
      case 1:
        return user.type === 'company' ? <CompanyData /> : <TravelerData />
      default:
        return null;
    }
  }
  if (isLoading) {
    return <Loader />;
  }
  return (
    <Grid container spacing={2} alignItems={"center"}>
      <Grid item xs={12} mb={2}>
        <Box display={"flex"} alignItems={"center"}>
          <Typography variant={"h4"}>
            My Profile Data
          </Typography>
          <Box ml={2}>
            <Button onClick={()=>navigate('/profile/edit')} variant={"contained"} color={"secondary"}>
              Edit
              <EditOutlined />
            </Button>
          </Box>
        </Box>
      </Grid>
      {user.type === 'company' ? (
        <Grid item xs={12}>
          <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
            <Box mb={2}>
              <img height={200} src={`${config.apiUrl}/${coverImage}`} alt={"company profile"} />
            </Box>
            <Button color={"secondary"} variant="contained" component="label">
              Update Cover Image
              <input onChange={async e => {
                setIsLoading(true);
                await updateCoverPicture(e?.target?.files?.[0]);
                await getCompanyProfile();
                setIsLoading(false);
              }} hidden accept="image/*" type="file" />
              <PhotoCamera />
            </Button>
          </Box>
        </Grid>
      ) : null}
      <Grid item xs={6}>
        <Avatar
          alt="User Avatar"
          src={user?.profile_picture ? `${config.apiUrl}/${user.profile_picture}` : undefined}
          sx={{ width: 80, height: 80 }}
          color={"primary"}
        >
          {!user?.profile_picture ? (user?.name ? user?.name.substring(0,1) : '') : null}
        </Avatar>
      </Grid>
      <Grid item xs={6}>
        <Button variant="contained" component="label">
          Upload
          <input onChange={e => updateProfilePicture(e?.target?.files?.[0])} hidden accept="image/*" type="file" />
          <PhotoCamera />
        </Button>
      </Grid>
      <Grid item xs={12}>
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
            </Tabs>
          </Grid>
          <Grid item xs={8}>
            {renderTabContent()}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
export default ShowProfile;
