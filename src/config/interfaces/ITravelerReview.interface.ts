import { GenderType } from '../types/gender.type'
import { IGuideReview } from './IGuideReview.interface'

export interface ITravelerReview {
	id: number
	national_id: string
	gender: GenderType
	date_of_birth: string
	is_guide: boolean
	reviews?: IGuideReview[]
}
