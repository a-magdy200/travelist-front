import { IResponseInterface } from '../../config/interfaces/IResponse.interface'
import { useState, useEffect } from 'react'
import api from '../../config/api'
import Loader from '../../components/Loader'
import { IBookingInterface } from '../../config/interfaces/IBooking.Interface'
import ListTravelerBookingsComponent from '../../components/Booking/TravelerBooking'
import CompanyBookingsList from "../../components/Booking/CompanyBookingsList";

const ListCompanyBookings = () => {
	const [bookings, setBookings] = useState<IBookingInterface[]>([])
	const [isLoading, setIsLoading] = useState(true);
	const getBookings = async () => {
		try {
			const response: IResponseInterface<IBookingInterface[]> = await api<
				IBookingInterface[]
			>({
				url: '/api/cycles/bookings/company',
			})

			if (response.success) {
				if (response.data) {
					setBookings(response.data)
					console.log(response.data)
				}
			}
		} catch (error: any) {
			console.log(error)
		}
	}
	useEffect(() => {
		getBookings().then(() => {
			setIsLoading(false);
		})
	}, [])
	if (isLoading) {
		return <Loader />
	}
	return (
		<div>
			<h1>Bookings</h1>
			<CompanyBookingsList bookings={bookings} />
		</div>
	)
}
export default ListCompanyBookings
