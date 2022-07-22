export interface LoginCredentials {
	email: string
	password: string
}
export interface ILoginFormProps {
	onSubmit: (values: LoginCredentials) => void
}
