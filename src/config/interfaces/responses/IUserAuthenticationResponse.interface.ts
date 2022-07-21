import { IUserInterface } from '../entities/IUser.interface'

export interface IUserAuthenticationResponse {
	access_token: string
	user: IUserInterface
}
