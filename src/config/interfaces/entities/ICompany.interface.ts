import { IUserInterface } from '../IUser.interface'
import { IProgramInterface } from './IProgram.interface'

export interface ICompanyInterface {
	id: number
	description?: string
	rate?: string
	cover_picture?: string
	name?: string
	user?: IUserInterface
	programs?: IProgramInterface[]
	programsCount?: number
}
