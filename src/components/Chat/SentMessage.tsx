import Card from "@mui/material/Card";
import { blueGrey } from "@mui/material/colors";
import Box from "@mui/material/Box";
import React from "react";
import { ChatMessage } from "../../config/interfaces/entities/IChat.interface";

const SentMessage =  ({message}: {message: ChatMessage}) => {
  return (
    <Box display={"flex"} justifyContent={"flex-end"} mb={1}>
      <Card variant={"outlined"} sx={{backgroundColor: blueGrey[500], color: 'white', maxWidth: '80%'}}>
        <Box p={1}>
          {message.content}
        </Box>
      </Card>
    </Box>
  )
}
export default SentMessage;
