import { IUserInterface } from './IUser.interface'
import { IFriendRequestInterface } from "./IFriendRequest.interface";

export interface IUserShowProps {
	user: IUserInterface
	isFriend: boolean
	friendRequest?: IFriendRequestInterface
	travelerId?: number;
}
