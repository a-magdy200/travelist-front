import { GenderType } from "../types/gender.type"
import { IUserInterface } from "./IUser.interface"

export interface ITravelerInterface {
	national_id: string
	gender: GenderType
	date_of_birth: string
	is_guide: boolean
	user:IUserInterface
}
