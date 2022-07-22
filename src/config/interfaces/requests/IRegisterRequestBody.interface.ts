import { Gender } from '../../helpers/types'

export interface IRegisterRequestBody {
	name: string
	email: string
	password: string
	address: string
	type: string
	national_id: number
	gender: Gender
	dateOfBirth: string
	isGuide: boolean
}
