import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import React from "react";
import SendMessageInput from "./SendMessageInput";
import useChat from "../../hooks/useChat";
import useAuth from "../../hooks/useAuth";
import SentMessage from "./SentMessage";
import ReceivedMessage from "./ReceivedMessage";

const ChatMessages = () => {
  const {messages} = useChat();
  const {user} = useAuth();
  return (
    <Grid item xs={10}>
      <Card variant={"outlined"}>
        <Box display={"flex"} p={2} flexDirection={"column"}>
          <Box sx={{ height: 400 }}>
            {messages.map((message) => (
              message.userId === user.id ? (
                <SentMessage message={message}/>
              ) : (
                <ReceivedMessage message={message} />
              )
            ))}
          </Box>
          <SendMessageInput/>
        </Box>
      </Card>
    </Grid>
  )
}
export default ChatMessages;
