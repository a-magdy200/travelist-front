import { ITransportationInterface } from '../entities/ITransportation.interface'

export interface ITransportationFormProps {
	initialValues: ITransportationInterface
	onSubmit: (values: ITransportationInterface) => void
}
