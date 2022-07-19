import { ICycleInterface } from './ICycle.interface'

export interface ICycleReview {
	id: number
	rating: number
	review: string
	updated_at: Date
	created_at: Date
	// traveler: ITravelerRequestBodyInterface
	cycle: ICycleInterface
}
