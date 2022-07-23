import { ITravelerInterface } from "./ITraveler.interface";
import { StatusType } from "../types/friend_request_status.type"

export interface IFriendRequestInterface
{
    id:number;
    status:StatusType;
    sender:ITravelerInterface;
    receiver:ITravelerInterface;

}
