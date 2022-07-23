import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import React, { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import useChat from "../../hooks/useChat";
import ChatUsersList from "../../components/Chat/ChatUsersList";
import ChatMessages from "../../components/Chat/ChatMessages";
import { Result } from "antd";

const Chat = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { getChats, chats } = useChat();
  useEffect(() => {
    (async () => {
      toast.info("Fetching conversations...");
      await getChats();
      setIsLoading(false);
    })();
  }, []);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <Box p={2}>
      {chats.length > 0 ? (
        <Grid container spacing={2}>
          <ChatUsersList />
          <ChatMessages />
        </Grid>
      ) : (
        <Result
          status="500"
          title="No conversations"
          subTitle="Sorry, looks like you need to add friends first."
        />
      )}
    </Box>);
};
export default Chat;
