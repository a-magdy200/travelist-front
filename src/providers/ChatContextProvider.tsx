import ChatContext from "../contexts/ChatContext";
import { ComponentProps, useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../config/api";
import { ChatMessage, IChatInterface } from "../config/interfaces/entities/IChat.interface";
import socket from "../config/socket";
import useAuth from "../hooks/useAuth";
import moment from "moment";

const ChatContextProvider = ({children}: ComponentProps<any>) => {
  const [chats, setChats] = useState<IChatInterface[]>([]);
  const [activeChat, setActiveChat] = useState<number>(0);
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const {user} = useAuth();
  const chatContextValue = {
    chats,
    activeChat,
    setActiveChat: async (chatId: number) => {
      setActiveChat(chatId);
    },
    isLoadingMessages,
    messages,
    getChats: async () => {
      toast.info("Fetching conversations...");
      try {
        const response = await api<IChatInterface[]>({
          url: '/api/admin/chats/'
        })
        if (response.data) {
          setChats(response.data);
          toast.success("Fetched");
        }
      } catch (e) {
        toast.error("An error has occurred");
      }
    },
    sendMessage: (message: string) => {
      socket.emit("private message", {
        message,
        to: activeChat
      })
      const newMessage = {
        content: message,
        id: Math.ceil(Math.random() * 999999999),
        userId: user.id,
        created_at: moment().toString(),
      }
      setMessages(previous => [newMessage].concat(previous));
    }
  };
  useEffect(() => {
    socket.on("new conversation", async () => {
      await chatContextValue.getChats()
    })
  }, []);
  useEffect(() => {
    if (activeChat < 1) {
      return;
    }
    (async () => {
      toast.info("Fetching messages...");
      setIsLoadingMessages(true);
      try {
        const response = await api<ChatMessage[]>({
          url: `/api/admin/chats/${activeChat}`
        })
        if (response.data) {
          setMessages(response.data);
          toast.success("Fetched");
        }
      } catch (e) {
        toast.error("An error has occurred");
      }
      setIsLoadingMessages(false);
    })();
  }, [activeChat]);
  return(
    <ChatContext.Provider value={chatContextValue}>
      {children}
    </ChatContext.Provider>
  )
}
export default ChatContextProvider;
