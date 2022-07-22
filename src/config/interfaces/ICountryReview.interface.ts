import { ICountryInterface } from './ICountry.interface'

export interface ICountryReview {
	id: number
	rating: number
	review: string
	updated_at: Date
	created_at: Date
	// traveler: ITravelerRequestBodyInterface
	country: ICountryInterface
}
