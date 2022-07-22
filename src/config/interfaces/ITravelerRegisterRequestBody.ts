import { ITravelerRequestBodyInterface } from './ITravelerRequestBody.interface'
import { IUserRequestBodyInterface } from './IUserRequestBody.interface'

export interface ITravelerRegisterRequestBody
	extends ITravelerRequestBodyInterface,
		IUserRequestBodyInterface {}
