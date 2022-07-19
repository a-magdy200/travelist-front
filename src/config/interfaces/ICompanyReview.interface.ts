import { ICompanyInterface } from './ICompany.interface'

export interface ICompanyReview {
	id: number
	rating: number
	review: string
	updated_at: Date
	created_at: Date
	// traveler: ITravelerRequestBodyInterface
	company: ICompanyInterface
}
