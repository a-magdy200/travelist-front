export interface ICountryInterface {
	id: number
	name: string
	total_rate?: number
	average_rate?: number
	ratings_count?: number
	// programs: Program[]
	// reviews: CountryReview[]
	// hotels: Hotel[]
	// group: Group
	created_at?: Date
	updated_at?: Date
	deleted_at?: Date
}
