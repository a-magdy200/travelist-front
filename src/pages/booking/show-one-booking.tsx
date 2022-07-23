import ShowCycleComponent from '../../components/cycles/ShowCycle'
import { useEffect, useState } from 'react'
import { ICycleInterface } from '../../config/interfaces/ICycle.interface'
import { useParams } from 'react-router-dom'
import { IResponseInterface } from '../../config/interfaces/IResponse.interface'
import api from '../../config/api'
import { IBookingInterface } from '../../config/interfaces/IBooking.Interface'
import ShowBookingComponent from '../../components/Booking/ShowBooking'
import { toast } from 'react-toastify'
import Loader from '../../components/Loader'
import DisplayErrorsList from '../../components/DisplayErrors/DisplayErrorsList'

const ShowBooking = () => {
	const [booking, setBooking] = useState<IBookingInterface>()
	const [isLoading, setIsLoading] = useState(false)
	const [errors, setErrors] = useState([])
	const { id } = useParams()
	const getBooking = async () => {
		toast.info('Get Booking....')
		setErrors([])
		setIsLoading(true)
		try {
			const response: IResponseInterface<IBookingInterface> =
				await api<IBookingInterface>({
					url: `/api/cycles/bookings/show/${id}`,
				})

			if (response.success) {
				if (response.data) {
					setBooking(response.data)
				}
			}
			toast.success('Get Successfully')
		} catch (error: any) {
			setErrors(error?.response?.data?.errors || [])
			toast.error('An error has occurred')
		}
		setIsLoading(false)
	}
	useEffect(() => {
		getBooking()
	}, [])
	if (isLoading) {
		return <Loader />
	}
	return (
		<div>
			{booking ? (
				<ShowBookingComponent booking={booking} />
			) : (
				<DisplayErrorsList errors={errors} />
			)}
		</div>
	)
}
export default ShowBooking
