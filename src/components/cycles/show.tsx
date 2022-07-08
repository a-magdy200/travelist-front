import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../config/api'
import { ICycleInterface } from '../../config/interfaces/ICycle.interface'
import { IResponseInterface } from '../../config/interfaces/IResponse.interface'
import Loader from '../Loader'

const ShowCycleComponent = () => {
	const [cycle, setCycle] = useState<ICycleInterface>()
	const { id } = useParams()
	const getCycle = async () => {
		try {
			const response: IResponseInterface<ICycleInterface> =
				await api<ICycleInterface>({
					url: `/cycles/show/${id}`,
				})

			if (response.success) {
				if (response.data) {
					setCycle(response.data)
					console.log(response.data)
				}
			}
		} catch (error: any) {
			console.log(error)
		}
	}
	useEffect(() => {
		getCycle()
	}, [])
	return (
		<div className="createContainer">
			cycle?
			<div className="TopCycle">
				<h1>Show Cycle</h1>
				<h2>Cycle ID:{cycle?.id}</h2>
				<h2>Cycle Name:{cycle?.name}</h2>
			</div>
			<div className="bottom">
				<h1>Cycle Details</h1>
				<h2>Max Seats:{cycle?.max_seats}</h2>
				<h2>Current Seats:{cycle?.current_seats}</h2>
			</div>
			:
			<Loader/>
		</div>
	)
}
export default ShowCycleComponent
