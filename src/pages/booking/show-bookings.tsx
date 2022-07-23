import { IBookingInterface } from "../../config/interfaces/IBooking.Interface"
import { IResponseInterface } from "../../config/interfaces/IResponse.interface"
import { useState, useEffect } from 'react'
import api from '../../config/api'
import Loader from '../../components/Loader'
import ListBookingComponent from "../../components/Booking/ListBookings"
import { toast } from "react-toastify"
import DisplayErrorsList from "../../components/DisplayErrors/DisplayErrorsList"

const ListBookings = () => {
	const [bookings, setBookings] = useState<IBookingInterface[]>([])
	const [isLoading, setIsLoading] = useState(false);
	const [errors, setErrors] = useState([]);
	const getBookings = async () => {
		try {
			toast.info("Getting Bookings....");
			setErrors([]);
			setIsLoading(true);
			const response: IResponseInterface<IBookingInterface[]> = await api<
				IBookingInterface[]
			>({
				url: '/api/cycles/bookings',
			})
	
			if (response.success) {
				if (response.data) {
					setBookings(response.data)
					console.log(response.data)
				}
			}
			toast.success("Posts Get Successfully");
		} catch (error: any) {
			setErrors(error?.response?.data?.errors || []);
			toast.error("An error has occurred");
		}
		setIsLoading(false);
	}
	useEffect(() => {
		getBookings()
	}, [])
	if (isLoading) {
		return <Loader/>
	  }
	return <div>
		{
		bookings ? 
		
		<ListBookingComponent bookings={bookings} /> 
	
		:
		<DisplayErrorsList errors={errors} />

	    }
		 </div>
}
export default ListBookings
