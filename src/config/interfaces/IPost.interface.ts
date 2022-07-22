import { ITravelerInterface } from './ITraveler.interface'
export interface IPostInterface {
	id: number
	content: string
	status?: string
	travelerId?: number
	groupId: number
	created_at?: string
	traveler: ITravelerInterface
}
