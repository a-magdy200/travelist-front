import { UserRole } from '../../types'

export interface RegisterCredentials {
	name: string
	address?: string
	email: string
	type: UserRole
	password: string
}
export interface IRegisterFormProps {
	onSubmit: (values: RegisterCredentials) => void
}
