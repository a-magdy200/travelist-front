import { IHotelInterface } from './IHotel.interface'
import { ITravelerRequestBodyInterface } from './ITravelerRequestBody.interface'
import { ITravelerInterface } from "./ITraveler.interface";

export interface IHotelReview {
	id: number
	rating: number
	review: string
	updated_at: Date
	created_at: Date
	traveler?: ITravelerInterface
	hotel: IHotelInterface
}
