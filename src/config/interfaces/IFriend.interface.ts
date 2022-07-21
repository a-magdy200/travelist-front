import { ITravelerInterface } from './ITraveler.interface'

export interface IFriendInterface {
	id: number
	sender_id: number
	receiver_id: number
	traveler_sender: ITravelerInterface
	traveler_receiver: ITravelerInterface
}
