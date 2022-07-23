import Grid from "@mui/material/Grid";
import ChatUserItem from "./ChatUserItem";
import useChat from "../../hooks/useChat";

const ChatUsersList = () => {
  const {chats} = useChat();
  return (
    <Grid item xs={2}>
      {chats.map((chat) => (
        <ChatUserItem chat={chat} key={chat.id}/>
      ))}
    </Grid>
  )
}
export default ChatUsersList;
