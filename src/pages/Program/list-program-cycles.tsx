import { IResponseInterface } from '../../config/interfaces/IResponse.interface'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import api from '../../config/api'
import ListProgramCyclesComponent from '../../components/programs/ListProgramCycles'
import { ICycleInterface } from '../../config/interfaces/ICycle.interface'
import Loader from '../../components/Loader'

const ListProgramCycles = () => {
	const [cycles, setCycles] = useState<ICycleInterface[]>([])
	const { id } = useParams()
	const getCycles = async () => {
		try {
			const response: IResponseInterface<ICycleInterface[]> = await api<
				ICycleInterface[]
			>({
				url: `/api/programs/show/cycles/${id}`,
			})

			if (response.success) {
				if (response.data) {
					setCycles(response.data)
					console.log(response.data)
				}
			}
		} catch (error: any) {
			console.log(error)
		}
	}
	useEffect(() => {
		getCycles()
	}, [])

	return (
		<div>
			{cycles ? <ListProgramCyclesComponent cycles={cycles} /> : <Loader />}
		</div>
	)
}
export default ListProgramCycles
