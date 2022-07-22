import { IHotelInterface } from './IHotel.interface'
import { ITravelerRequestBodyInterface } from './ITravelerRequestBody.interface'

export interface IHotelReview {
	id: number
	rating: number
	review: string
	updated_at: Date
	created_at: Date
	// traveler: ITravelerRequestBodyInterface
	hotel: IHotelInterface
}
