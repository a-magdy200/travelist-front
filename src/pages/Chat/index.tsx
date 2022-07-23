import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Avatar, TextField } from "@mui/material";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import { SendOutlined } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import socket from "../../config/socket";
import { blue, blueGrey } from "@mui/material/colors";
import config from "../../config/app_config/config";
import Typography from "@mui/material/Typography";

const Chat = () => {
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    socket.emit("private message", {
      message: 'testing',
      to: message
    })
  }
  useEffect(() => {
    socket.onAny((e: any, d:any) => {
      console.log(e, d);
    })
    console.log(socket.id);
  }, []);
  return (
    <Box p={2}>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Box mb={1}>
            <Card variant={"outlined"} sx={{backgroundColor: blue[50]}}>
              <Box p={1} display={"flex"} alignItems={"center"}>
                <Avatar
                  alt="User Avatar"
                  color={"primary"} />
                <Typography ml={1} variant={"body1"}>
                  Some user 1
                </Typography>
              </Box>
            </Card>
          </Box>
          <Box mb={1}>
            <Card variant={"outlined"}>
              <Box p={1} display={"flex"} alignItems={"center"}>
                <Avatar
                  alt="User Avatar"
                  color={"primary"} />
                <Typography ml={1} variant={"body1"}>
                  Some user 1
                </Typography>
              </Box>
            </Card>
          </Box>
        </Grid>
        <Grid item xs={10}>
          <Card variant={"outlined"}>
            <Box display={"flex"} p={2} flexDirection={"column"}>
              <Box sx={{ height: 400 }}>
                <Box display={"flex"} justifyContent={"flex-start"} mb={1}>
                  <Card variant={"outlined"} sx={{backgroundColor: blueGrey[50], maxWidth: '80%'}}>
                    <Box p={1}>
                      some message
                    </Box>
                  </Card>
                </Box>
                <Box display={"flex"} justifyContent={"flex-end"} mb={1}>
                  <Card variant={"outlined"} sx={{backgroundColor: blueGrey[500], color: 'white', maxWidth: '80%'}}>
                    <Box p={1}>
                      some message
                    </Box>
                  </Card>
                </Box>
              </Box>
              <Box display={"flex"} alignItems={"center"}>
              <TextField
                multiline
                fullWidth
                rows={3}
                value={message}
                onChange={e => setMessage(e.target.value)}
                label={"Message"}
                variant={"filled"} />
                <Box ml={2}>
                  <IconButton onClick={sendMessage} disabled={message.length < 1} color={"primary"}>
                    <SendOutlined/>
                  </IconButton>
                </Box>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>);
};
export default Chat;
