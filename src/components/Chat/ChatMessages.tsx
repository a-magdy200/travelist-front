import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import React, { useEffect, useRef } from "react";
import SendMessageInput from "./SendMessageInput";
import useChat from "../../hooks/useChat";
import useAuth from "../../hooks/useAuth";
import SentMessage from "./SentMessage";
import ReceivedMessage from "./ReceivedMessage";

const ChatMessages = () => {
  const {messages} = useChat();
  const {user} = useAuth();
  const messagesContainerRef = useRef<HTMLElement>(null)
  useEffect(() => {
    const interval = setInterval(() => {
      if (messagesContainerRef.current) {
        if (messagesContainerRef.current.scrollTop < messagesContainerRef.current.scrollHeight) {
          messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    }
  }, [])
  return (
    <Grid item xs={10}>
      <Card variant={"outlined"}>
        <Box display={"flex"} p={2} flexDirection={"column"}>
          <Box ref={messagesContainerRef} sx={{ height: 400, overflowY: 'scroll' }}>
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
