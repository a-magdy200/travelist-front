import ShowCycleComponent from '../../components/cycles/ShowCycle'
import {useEffect, useState} from "react";
import {ICycleInterface} from "../../config/interfaces/ICycle.interface";
import {useParams} from "react-router-dom";
import {IResponseInterface} from "../../config/interfaces/IResponse.interface";
import api from "../../config/api";
import { IBookingInterface } from '../../config/interfaces/IBooking.Interface';
import ShowBookingComponent from '../../components/Booking/ShowBooking';

const ShowBooking = () => {
	const [booking, setBooking] = useState<IBookingInterface>()
	const { id } = useParams()
	const getBooking = async () => {
		try {
			const response: IResponseInterface<IBookingInterface> =
				await api<IBookingInterface>({
					url: `/api/cycles/bookings/show/${id}`,
				})

			if (response.success) {
				if (response.data) {
					setBooking(response.data)
					console.log(response.data)
				}
			}
		} catch (error: any) {
			console.log(error)
		}
	}
	useEffect(() => {
		getBooking()
	}, [])
	return(
		
	<div>
		{
			booking?
	 <ShowBookingComponent booking={booking}/>
	 :
	 <div>not found</div>
    	}
	 </div>	
	

	)
}
export default ShowBooking
