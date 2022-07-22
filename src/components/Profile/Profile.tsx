import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ProfilePictureChanger from "./ProfilePictureChanger";
import { IUserShowProps } from "../../config/interfaces/IUserShowProps.interface";

const Profile = ({ user }: IUserShowProps) => {
  return (
    <div>
      <Typography variant="h5" component="div" gutterBottom>
        Profile
      </Typography>
      <ProfilePictureChanger />
      <Grid container spacing={2} xs={10} lg={8} mb={3}>
        <Grid item xs={6}>
          Name:
        </Grid>
        <Grid item xs={6}>
          {user.name}
        </Grid>
        <Grid item xs={6}>
          Email:
        </Grid>
        <Grid item xs={6}>
          {user.email}
        </Grid>
        <Grid item xs={6}>
          Type:
        </Grid>
        <Grid item xs={6}>
          {user.type}
        </Grid>
        <Grid item xs={6}>
          Location:
        </Grid>
        <Grid item xs={6}>
          {user.address}
        </Grid>
      </Grid>
    </div>
  );
};

export default Profile;
