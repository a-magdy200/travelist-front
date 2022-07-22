import { ICountryInterface } from '../entities/ICountry.interface'

export interface ICountryFormProps {
	initialValues: ICountryInterface
	onSubmit: (values: ICountryInterface) => void
}
