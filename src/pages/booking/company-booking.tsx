import { IResponseInterface } from '../../config/interfaces/IResponse.interface'
import { useState, useEffect } from 'react'
import api from '../../config/api'
import Loader from '../../components/Loader'
import { IBookingInterface } from '../../config/interfaces/IBooking.Interface'
import ListTravelerBookingsComponent from '../../components/Booking/TravelerBooking'
import CompanyBookingsList from '../../components/Booking/CompanyBookingsList'
import { toast } from 'react-toastify'
import DisplayErrorsList from '../../components/DisplayErrors/DisplayErrorsList'

const ListCompanyBookings = () => {
	const [bookings, setBookings] = useState<IBookingInterface[]>([])
	const [isLoading, setIsLoading] = useState(false)
	const [errors, setErrors] = useState([])
	const getBookings = async () => {
		toast.info('Getting Bookings....')
		setErrors([])
		setIsLoading(true)
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
			toast.success('Getting Successfully')
		} catch (error: any) {
			setErrors(error?.response?.data?.errors || [])
			toast.error('An error has occurred')
		}
		setIsLoading(false)
	}
	useEffect(() => {
		getBookings().then(() => {})
	}, [])
	if (isLoading) {
		return <Loader />
	}
	return (
		<div>
			<h1>Bookings</h1>
			{bookings.length ? (
				<CompanyBookingsList bookings={bookings} />
			) : (
				<DisplayErrorsList errors={errors} />
			)}
		</div>
	)
}
export default ListCompanyBookings
