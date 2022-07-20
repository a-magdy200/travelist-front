import { ICompanyInterface } from './ICompany.interface'
import { ITravelerInterface } from './ITraveler.interface'

export interface ICompanyReview {
	id: number
	rating: number
	review: string
	updated_at: Date
	created_at: Date
	traveler: ITravelerInterface
	company: ICompanyInterface
}
