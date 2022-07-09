import { ICompanyInterface } from "./ICompany.interface"
import { IHotelInterface } from "./IHotel.interface"
import { ITransportationInterface } from "./ITransportation.interface"

export interface IProgramInterface {
    id: number
    name: string
    company: ICompanyInterface
    price: number
    description:string
    is_Recurring: boolean
    total_rating_value :number                 
    total_rating_users :number              
    average_rating:number
    cover_picture:string
    transportation: ITransportationInterface
    hotels:IHotelInterface|IHotelInterface[]
}