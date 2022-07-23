import { ITravelerInterface } from "./ITraveler.interface";

export interface IAddFriendRequestBody {
    sender:ITravelerInterface
    receiver:ITravelerInterface
  }