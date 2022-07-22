import { ICompanyInterface } from './ICompany.interface'
import { ICountryInterface } from './ICountry.interface'
import { ICycleInterface } from './ICycle.interface'
import { IHotelInterface } from './IHotel.interface'
import { ITransportationInterface } from './ITransportation.interface'

export interface IProgramInterface {
	id: number
	name: string
	company: ICompanyInterface
	price: number
	description: string
	is_Recurring: boolean
	total_rate: number
	average_rate: number
	average_rating: number
	cover_picture?: string
	transportation: ITransportationInterface
	country: ICountryInterface
	hotels: IHotelInterface[]
	destinations: ICountryInterface[]
	cycles?: ICycleInterface[]
}
