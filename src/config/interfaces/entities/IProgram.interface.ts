import { ICompanyInterface } from './ICompany.interface'
import { ITransportationInterface } from './ITransportation.interface'

export interface IProgramInterface {
	id: number
	name: string
	company: ICompanyInterface
	price: number
	is_Recurring: boolean
	transportation: ITransportationInterface
}
