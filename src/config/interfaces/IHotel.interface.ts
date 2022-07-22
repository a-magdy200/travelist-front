import { ICountryInterface } from './ICountry.interface'
import { IHotelReview } from './IHotelReview.interface'

export interface IHotelInterface {
	id: number
	name: string
	address?: string
	stars?: number
	total_rate?: number
	ratings_count?: number
	average_rate?: number
	cover_picture?: string
	reviews?: IHotelReview[]
	country?: ICountryInterface
	countryId?: number
	countryName?: string
	programsCount?: number
}
