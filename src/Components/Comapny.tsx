import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ProfilePictureChanger from './ProfilePictureChanger';
import EditMenu from './EditMenu';
import Profile from './Profile';

  const Company=()=>{
      return (
        <Stack direction="column" spacing={2} 
        display="flex"
       // justifyContent="center"
        alignItems="center"
        minHeight="100vh">
            <Grid container spacing={2} xs={10} lg={8} mb={3}>
        <Grid item xs={6}>
        Description:
        </Grid>
        <Grid item xs={6}>
         ghhhghgsjjaahjjjjjjhbb
         </Grid>
        <Grid item xs={6}>
         Rate:
        </Grid>
        <Grid item xs={6}>
         3.8
         </Grid>
        <Grid item xs={6}>
         Phone:
        </Grid>
        <Grid item xs={6}>
         1234567
        </Grid>
        
       </Grid>
     
            <EditMenu/>
            
      </Stack>
 
      );
    }
    
export default Company;












