import { useEffect, useState } from 'react'
import CountryFilter from '../../components/FilterBar/CountryFilter'
import PriceFilter from '../../components/FilterBar/PriceFilter'
import StarFilter from '../../components/FilterBar/StarFilter'
import ListHotelsComponent from '../../components/hotels/ListHotels'
import api from '../../config/api'
import { IHotelInterface } from '../../config/interfaces/IHotel.interface'
import { IResponseInterface } from '../../config/interfaces/IResponse.interface'
import Box from '@mui/material/Box';
import FilterComponent from '../../components/FilterBar'
import FilterHotelsComponent from '../../components/hotels/FilterHotels'
import Loader from "../../components/Loader";

const ListHotels = () => {
	const [hotels, setHotels] = useState<IHotelInterface[]>([])
	const [filteredHotels, setFilteredHotels] = useState<IHotelInterface[]>()

	const [isLoading, setIsLoading] = useState(true);
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
					setFilteredHotels([...response.data])
				}
			}
		} catch (error: any) {
			console.log(error)
		}
	}

	useEffect(() => {
		getHotels().then(() => setIsLoading(false))
	}, [])
	if (isLoading) {
		return <Loader />
	}
	return (
		<div>
			<h1>Hotels Page</h1>
			<FilterHotelsComponent
			hotels={hotels}
			setFilteredHotels={setFilteredHotels}
			/>
			{filteredHotels ? (
				filteredHotels.map((hotel, index) => (
					<ListHotelsComponent hotel={hotel} key={index} />
				))
			) : (
				<div></div>
			)}
		</div>
	)
}
export default ListHotels
