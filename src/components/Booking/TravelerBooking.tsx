import { IBookingInterface } from '../../config/interfaces/IBooking.Interface'
import { IBookingListProps } from '../../config/interfaces/IBookingListProps.interface'
import BookingCard from './BookingCard'

const ListTravelerBookingsComponent = ({ bookings }: IBookingListProps) => {
	return (
		<div>
			{bookings.length ? (
				bookings.map((booking: IBookingInterface, index) => (
					<BookingCard booking={booking} key={index} />
				))
			) : (
				<div>Not Found</div>
			)}
		</div>
	)
}

export default ListTravelerBookingsComponent
