import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../config/api'
import { IResponseInterface } from '../../config/interfaces/IResponse.interface'
import { IHotelInterface } from '../../config/interfaces/IHotel.interface'
import ShowHotelComponent from '../../components/hotels/ShowHotel'

const ShowHotel = () => {
	const [hotel, setHotel] = useState<IHotelInterface>()
	const { id } = useParams()

	const getHotel = async () => {
		try {
			const response: IResponseInterface<IHotelInterface> =
				await api<IHotelInterface>({
					url: `/api/hotels/${id}`,
				})
			if (response.success) {
				if (response.data) {
					setHotel(response.data)
				}
			}
		} catch (error: any) {
			console.log(error)
		}
	}
	useEffect(() => {
		getHotel()
	}, [])

	return <div>{hotel ? <ShowHotelComponent hotel={hotel} /> : <div></div>}</div>
}
export default ShowHotel
