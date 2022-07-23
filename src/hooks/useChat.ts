import { useContext } from "react";
import ChatContext from "../contexts/ChatContext";

const useChat = () => {
  return useContext(ChatContext)
}
export default useChat;
