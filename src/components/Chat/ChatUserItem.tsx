import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { Avatar } from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";
import config from "../../config/app_config/config";
import { blue } from "@mui/material/colors";
import { IChatUserProps } from "../../config/interfaces/props/IChatProps";
import useAuth from "../../hooks/useAuth";
import useChat from "../../hooks/useChat";
import Button from "@mui/material/Button";

const ChatUserItem = ({chat}: IChatUserProps) => {
  const {user} = useAuth();
  const {setActiveChat, activeChat} = useChat();
  const chatUser = chat.chatUsers.filter((_chatUser) => _chatUser.user.id !== user.id)[0].user;
  return (
    <Box mb={1}>
      <Button onClick={() => setActiveChat(chat.id)}>
        <Card variant={"outlined"} sx={activeChat === chat.id ? {backgroundColor: blue[50]} : {}}>
          <Box p={1} display={"flex"} alignItems={"center"}>
            <Avatar
              alt="User Avatar"
              src={chatUser.profile_picture!== '' ? `${config.apiUrl}/${chatUser.profile_picture}` : undefined}
              color={"primary"} />
            <Typography ml={1} variant={"body1"}>
              {chatUser.name}
            </Typography>
          </Box>
        </Card>
      </Button>
    </Box>
  )
}
export default ChatUserItem;
