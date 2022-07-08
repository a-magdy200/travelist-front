import ShowCycleComponent from '../../components/cycles/show'
import { useEffect, useState } from 'react'
import { ICycleInterface } from '../../config/interfaces/ICycle.interface'
import { useParams } from 'react-router-dom'
import { IResponseInterface } from '../../config/interfaces/IResponse.interface'
import api from '../../config/api'

const ShowCycle = () => {
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
		<div>
			{cycle ? <ShowCycleComponent cycle={cycle} /> : <div>not found</div>}
		</div>
	)
}
export default ShowCycle
