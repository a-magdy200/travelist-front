import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import image from '../../assets/avatar.png'
import ProfilePictureChanger from "./ProfilePictureChanger";

const Profile = () => {
  return (
    <Stack
    direction="column"
    spacing={2}
    display="flex"
    // justifyContent="center"
    alignItems="center"

  >

      <Typography variant="h3" component="div" gutterBottom>
        Profile
      </Typography>
      <ProfilePictureChanger/>
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

      </Grid>

      </Stack>
  )
}

export default Profile
