import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { IProgramInterface } from '../../config/interfaces/IProgram.interface'
import { IResponseInterface } from '../../config/interfaces/IResponse.interface'
import api from '../../config/api'
import ProgramDetailsComponent from '../../components/programs/ProgramDetails'

const ProgramDetailsPage = () => {
	const [program, setProgram] = useState<IProgramInterface>()
	const { id } = useParams()

	const getProgram = async () => {
		try {
			const response: IResponseInterface<IProgramInterface> =
				await api<IProgramInterface>({
					url: `/programs/show/${id}`,
				})
			if (response.success) {
				if (response.data) {
					setProgram(response.data)
				}
			}
		} catch (error: any) {
			console.log(error)
		}
	}
	useEffect(() => {
		getProgram()
	}, [])

	return (
		<div>
			{program? <ProgramDetailsComponent program={program} /> : <div></div>}
		</div>
	)
}
export default ProgramDetailsPage