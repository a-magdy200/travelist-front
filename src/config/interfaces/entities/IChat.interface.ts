import { IUserInterface } from "../IUser.interface";

export interface ChatUser {
  id: number
  user: IUserInterface
}
export interface ChatMessage {
  id: number
  content: string
  userId: number;
  created_at: string
}
export interface IChatInterface {
  id: number
  chatUsers: ChatUser[]
  messages: ChatMessage[]
  created_at: string
  updated_at: string
  deleted_at: string
}
