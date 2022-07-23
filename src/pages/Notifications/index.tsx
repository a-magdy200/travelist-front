import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { TextField } from "@mui/material";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import { SendOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import socket from "../../config/socket";
import Typography from "@mui/material/Typography";

const Notifications = () => {
  return (
    <Box p={2}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box mb={1}>
          <Card variant={"outlined"} sx={{height: '100%'}}>
            <Box p={2}>
              <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>

              <Typography variant={"h6"}>
                notification title
              </Typography>
                <Typography variant={"caption"}>
                  12:00PM, 02/02/2022
                </Typography>
              </Box>
              <Typography variant={"body1"}>
                notification content
              </Typography>
            </Box>
          </Card>
          </Box>
          <Box mb={1}>
          <Card variant={"outlined"} sx={{height: '100%'}}>
            <Box p={2}>
              <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>

              <Typography variant={"h6"}>
                notification title
              </Typography>
                <Typography variant={"caption"}>
                  12:00PM, 02/02/2022
                </Typography>
              </Box>
              <Typography variant={"body1"}>
                notification content
              </Typography>
            </Box>
          </Card>
          </Box>
          <Box mb={1}>
          <Card variant={"outlined"} sx={{height: '100%'}}>
            <Box p={2}>
              <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>

              <Typography variant={"h6"}>
                notification title
              </Typography>
                <Typography variant={"caption"}>
                  12:00PM, 02/02/2022
                </Typography>
              </Box>
              <Typography variant={"body1"}>
                notification content
              </Typography>
            </Box>
          </Card>
          </Box>
        </Grid>
      </Grid>
    </Box>);
};
export default Notifications;
