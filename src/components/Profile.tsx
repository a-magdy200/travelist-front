import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import image from '../assets/avatar.png'
import ProfilePictureChanger from "./ProfilePictureChanger";

const Profile = () => {
  return (
    <Stack
      direction="column"
      spacing={2}
      display="flex"
      alignItems="center"
      minHeight="100vh"
    >
      <Typography variant="h3" component="div" gutterBottom>
        Profile
      </Typography>
      <Avatar alt="" src={image} sx={{ width: 112, height: 112 }} />
      <ProfilePictureChanger />
      <Grid container spacing={2} xs={10} lg={8} mb={3}>
        <Grid item xs={6}>
          Name:
        </Grid>
        <Grid item xs={6}>
          Dina Farouk
        </Grid>
        <Grid item xs={6}>
          Email:
        </Grid>
        <Grid item xs={6}>
          dinaharb46@gmail.com
        </Grid>
        <Grid item xs={6}>
          Type:
        </Grid>
        <Grid item xs={6}>
          Traveler
        </Grid>
        <Grid item xs={6}>
          Location:
        </Grid>
        <Grid item xs={6}>
          Alexandria
        </Grid>
        <Grid item xs={6}>
          Gender:
        </Grid>
        <Grid item xs={6}>
          Female
        </Grid>
        <Grid item xs={6}>
          Date Of Birth :
        </Grid>
        <Grid item xs={6}>
          24-11-1996
        </Grid>
        <Grid item xs={6}>
          National Id:
        </Grid>
        <Grid item xs={6}>
          1111112222225
        </Grid>
        <Grid item xs={6}>
          Guide:
        </Grid>
        <Grid item xs={6}>
          No
        </Grid>
      </Grid>
      <Button variant="contained" size="large">
        Edit Profile
      </Button>
    </Stack>
  )
}

export default Profile
