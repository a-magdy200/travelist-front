import { GenderType } from "../types/gender.type"
import { IUserInterface } from "./IUser.interface"

export interface  ITravelerInterface
{
    national_id: string
	gender: GenderType
	date_of_birth: string
	is_guide: boolean
    total_rate:number
    ratings_count:number
    average_rate:number
    userId:number
    user:IUserInterface
    
}