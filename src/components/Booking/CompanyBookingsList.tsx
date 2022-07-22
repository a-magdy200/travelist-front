import { IBookingInterface } from '../../config/interfaces/IBooking.Interface'
import { IBookingListProps } from '../../config/interfaces/IBookingListProps.interface'
import CompanyBookingCard from "./CompanyBookingCard";

const CompanyBookingsList = ({ bookings }: IBookingListProps) => {
	return (
		<div>
			{bookings.length ? (
				bookings.map((booking: IBookingInterface, index) => (
					<CompanyBookingCard booking={booking} key={index} />
				))
			) : (
				<div>Not Found</div>
			)}
		</div>
	)
}
export default CompanyBookingsList;
