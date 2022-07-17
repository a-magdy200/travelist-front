import { useEffect, useState } from 'react'
import ListHotelsComponent from '../../components/hotels/ListHotels'
import api from '../../config/api'
import { IHotelInterface } from '../../config/interfaces/IHotel.interface'
import { IResponseInterface } from '../../config/interfaces/IResponse.interface'

const ListHotels = () => {
	const [hotels, setHotels] = useState<IHotelInterface[]>()

	const getHotels = async () => {
		try {
			const response: IResponseInterface<IHotelInterface[]> = await api<
				IHotelInterface[]
			>({
				url: '/api/hotels/',
			})

			if (response.success) {
				if (response.data) {
					setHotels(response.data)
					// console.log(response.data)
				}
			}
		} catch (error: any) {
			console.log(error)
		}
	}

	useEffect(() => {
		getHotels()
	}, [])
	return (
		<div>
			<h1>Hotels Page</h1>
			{hotels ? (
				hotels.map((hotel, index) => (
					<ListHotelsComponent hotel={hotel} key={index} />
				))
			) : (
				<div></div>
			)}
		</div>
	)
}
export default ListHotels
