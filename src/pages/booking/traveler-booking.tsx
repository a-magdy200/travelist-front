import { IResponseInterface } from '../../config/interfaces/IResponse.interface'
import { useState, useEffect } from 'react'
import api from '../../config/api'
import Loader from '../../components/Loader'
import { IBookingInterface } from '../../config/interfaces/IBooking.Interface'
import ListTravelerBookingsComponent from '../../components/Booking/TravelerBooking'

const ListTravelerBookings = () => {
	const [bookings, setBookings] = useState<IBookingInterface[]>([])
	const getCompanies = async () => {
		try {
			const response: IResponseInterface<IBookingInterface[]> = await api<
				IBookingInterface[]
			>({
				url: '/api/cycles/bookings/traveler',
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
		getCompanies()
	}, [])
	return (
		<div>
			<h1>Bookings</h1>
			{bookings ? (
				<ListTravelerBookingsComponent bookings={bookings} />
			) : (
				<Loader />
			)}
		</div>
	)
}
export default ListTravelerBookings
