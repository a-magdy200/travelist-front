import { IHotelInterface } from '../entities/IHotel.interface'

export interface IHotelFormProps {
	initialValues: IHotelInterface
	onSubmit: (values: IHotelInterface) => void
}
