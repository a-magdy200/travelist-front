import { ICompanyRequestBodyInterface } from './ICompanyRequestBody.interface'
import { IUserRequestBodyInterface } from './IUserRequestBody.interface'

export interface ICompanyRegisterRequestBody
	extends ICompanyRequestBodyInterface,
		IUserRequestBodyInterface {}
