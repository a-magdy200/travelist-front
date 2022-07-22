import { ICompanyReview } from './ICompanyReview.interface'
import { IProgramInterface } from './IProgram.interface'
import { IUserInterface } from "./IUser.interface";
export interface ICompanyInterface {
	id: number
	description: string
	total_rate: string
	ratings_count: number
	average_rate?: number
	cover_picture: string
	user: IUserInterface
	programs: IProgramInterface[]
	reviews?: ICompanyReview[]
}
