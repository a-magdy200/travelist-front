import { ICountryInterface } from './ICountry.interface'
import { IPostInterface } from './IPost.interface'

export interface IGroupInterface {
	id: number
	postsCount?: number
	posts?: IPostInterface[]
	// programs: Program[]
	// reviews: CountryReview[]
	// hotels: Hotel[]
	// group: Group
	countryName?: string
	country?: ICountryInterface
	created_at?: Date
	updated_at?: Date
	deleted_at?: Date
}
