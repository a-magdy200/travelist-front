import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { SendOutlined } from "@mui/icons-material";
import React, { useState } from "react";
import useChat from "../../hooks/useChat";

const SendMessageInput = () => {
  const {sendMessage} = useChat();
  const [message, setMessage] = useState('');
  const handleSendMessage = () => {
    sendMessage(message);
    setMessage('');
  }
  return (
    <Box display={"flex"} alignItems={"center"}>
      <TextField
        multiline
        fullWidth
        rows={3}
        value={message}
        onChange={e => setMessage(e.target.value)}
        label={"Message"}
        variant={"filled"}
      />
      <Box ml={2}>
        <IconButton onClick={handleSendMessage} disabled={message.length < 1} color={"primary"}>
          <SendOutlined/>
        </IconButton>
      </Box>
    </Box>
  )
}
export default SendMessageInput;
