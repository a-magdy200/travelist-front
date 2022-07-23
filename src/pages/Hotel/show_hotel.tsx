import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../config/api'
import { IResponseInterface } from '../../config/interfaces/IResponse.interface'
import { IHotelInterface } from '../../config/interfaces/IHotel.interface'
import ShowHotelComponent from '../../components/hotels/ShowHotel'
import Loader from '../../components/Loader'
import { toast } from 'react-toastify'

const ShowHotel = () => {
	const [hotel, setHotel] = useState<IHotelInterface>()
	const [isLoading, setIsLoading] = useState(false)
	const { id } = useParams()

	const getHotel = async () => {
		toast.info('Getting Hotel Data....')
		setIsLoading(true)
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
			toast.success('Get Data Successfully')
		} catch (error: any) {
			toast.error('An error has occurred')
			console.log(error)
		}
		setIsLoading(false)
	}
	useEffect(() => {
		getHotel().then(() => setIsLoading(false))
	}, [])
	if (isLoading) {
		return <Loader />
	}
	return (
		<div>
			{hotel ? <ShowHotelComponent hotel={hotel} /> : <div>Not Found</div>}
		</div>
	)
}
export default ShowHotel
