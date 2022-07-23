import { IChatInterface } from "../entities/IChat.interface";

export interface IChatUserProps {
  chat: IChatInterface,
}

export interface IChatUsersListProps {
  chats: IChatInterface[],
}
