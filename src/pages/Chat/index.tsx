import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import React, { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import useChat from "../../hooks/useChat";
import ChatUsersList from "../../components/Chat/ChatUsersList";
import ChatMessages from "../../components/Chat/ChatMessages";

const Chat = () => {
  const [isLoading, setIsLoading] = useState(true)
  const {getChats} = useChat();
  useEffect(() => {
    (async () => {
      toast.info("Fetching conversations...");
      await getChats();
      setIsLoading(false);
    })();
  }, []);
  if (isLoading) {
    return <Loader/>
  }
  return (
    <Box p={2}>
      <Grid container spacing={2}>
        <ChatUsersList/>
        <ChatMessages/>
      </Grid>
    </Box>);
};
export default Chat;
