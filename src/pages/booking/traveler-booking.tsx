import { IResponseInterface } from '../../config/interfaces/IResponse.interface'
import { useState, useEffect } from 'react'
import api from '../../config/api'
import Loader from '../../components/Loader'
import { IBookingInterface } from '../../config/interfaces/IBooking.Interface'
import ListTravelerBookingsComponent from '../../components/Booking/TravelerBooking'
import { toast } from 'react-toastify'
import DisplayErrorsList from '../../components/DisplayErrors/DisplayErrorsList'

const ListTravelerBookings = () => {
	const [bookings, setBookings] = useState<IBookingInterface[]>([])
	const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);
	const getBookings = async () => {
		toast.info("Getting Bookings....");
         setErrors([]);
         setIsLoading(true);
		try {

			const response: IResponseInterface<IBookingInterface[]> = await api<
				IBookingInterface[]
			>({
				url: '/api/cycles/bookings/traveler',
			})

			if (response.success) {
				if (response.data) {
					setBookings(response.data)
				}
			}
			toast.success("Getting Successfully.");
		} catch (error: any) {
			setErrors(error?.response?.data?.errors || []);
			toast.error("An error has occurred");
		}
		setIsLoading(false);
	}
	useEffect(() => {
		getBookings().then(() => {
		})
	}, [])
	if (isLoading) {
		return <Loader />
	}
	return (
		<div>
			<h1>My Bookings</h1>
			<DisplayErrorsList errors={errors} />
			<ListTravelerBookingsComponent bookings={bookings} />
		</div>
	)
}
export default ListTravelerBookings
