import { createContext } from "react";
import { ChatMessage, IChatInterface } from "../config/interfaces/entities/IChat.interface";
interface ChatContextInterface {
  chats: IChatInterface[];
  activeChat: number;
  setActiveChat: (userId: number) => void;
  messages: ChatMessage[];
  getChats: () => void;
  sendMessage: (message: string) => void;
}
const ChatContext = createContext<ChatContextInterface>({
  chats: [],
  activeChat: 0,
  setActiveChat: (userId: number) => {},
  messages: [],
  getChats: () => {},
  sendMessage: (message: string) => {}
})
export default ChatContext
