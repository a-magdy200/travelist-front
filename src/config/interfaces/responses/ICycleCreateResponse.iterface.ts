import { ICycleInterface } from '../entities/ICycle.interface'

export interface ICycleCreateResponse {
	access_token: string
	cycle: ICycleInterface
}
