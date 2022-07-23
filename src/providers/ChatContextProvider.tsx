import ChatContext from "../contexts/ChatContext";
import { ComponentProps, useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../config/api";
import { ChatMessage, IChatInterface } from "../config/interfaces/entities/IChat.interface";
import socket from "../config/socket";
import useAuth from "../hooks/useAuth";
import moment from "moment";
import { IUserInterface } from "../config/interfaces/IUser.interface";

const ChatContextProvider = ({children}: ComponentProps<any>) => {
  const [chats, setChats] = useState<IChatInterface[]>([]);
  const [activeChat, setActiveChat] = useState<number>(0);
  const [otherUser, setOtherUser] = useState<IUserInterface>();
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
          if (response.data.length > 0) {
            setActiveChat(response.data[0].id);
          }
          toast.success("Fetched");
        }
      } catch (e) {
        toast.error("An error has occurred");
      }
    },
    sendMessage: (message: string) => {
      socket.emit("private message", {
        message,
        to: otherUser?.id,
        chatId: activeChat
      })
      const newMessage = {
        content: message,
        id: Math.ceil(Math.random() * 999999999),
        userId: user.id,
        created_at: moment().toString(),
      }
      setMessages(previous => previous.concat([newMessage]));
    }
  };
  useEffect(() => {
    socket.on("new conversation", async () => {
      await chatContextValue.getChats()
    })
    socket.on("receive message", (message) => {
      setMessages(previous => previous.concat([message]))
    })
  }, []);
  useEffect(() => {
    if (activeChat < 1) {
      return;
    }
    (async () => {
      toast.info("Fetching messages...");
      const currentChat = chats.find(({id}) => id === activeChat);
      if (currentChat) {
        const chatUser = currentChat.chatUsers.filter((_chatUser) => _chatUser.user.id !== user.id)[0].user;
        setOtherUser(chatUser);
      }
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
