import { IHotelInterface } from './IHotel.interface'
import { IGroupInterface } from './IGroup.interface'
import { IProgramInterface } from './IProgram.interface'

export interface ICountryInterface {
	id: number
	name: string
	total_rate?: number
	average_rate?: number
	ratings_count?: number
	programs?: IProgramInterface[]
	reviews?: any[]
	hotels?: IHotelInterface[]
	group?: IGroupInterface
}
