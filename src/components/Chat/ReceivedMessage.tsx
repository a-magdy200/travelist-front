import Card from "@mui/material/Card";
import { blueGrey } from "@mui/material/colors";
import Box from "@mui/material/Box";
import React from "react";
import { ChatMessage } from "../../config/interfaces/entities/IChat.interface";

const ReceivedMessage = ({message}: {message: ChatMessage}) => {
  return (
    <Box display={"flex"} justifyContent={"flex-start"} mb={1}>
      <Card variant={"outlined"} sx={{backgroundColor: blueGrey[50], maxWidth: '80%'}}>
        <Box p={1}>
          {message.content}
        </Box>
      </Card>
    </Box>
  )
}
export default ReceivedMessage;
