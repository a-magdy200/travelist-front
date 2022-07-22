import { useEffect, useState } from 'react'
import Loader from '../../components/Loader'
import ListProgramsComponent from '../../components/programs/ListPrograms'
import ProgramCard from '../../components/programs/ProgramCard'
import api from '../../config/api'
import { IProgramInterface } from '../../config/interfaces/IProgram.interface'
import { IResponseInterface } from '../../config/interfaces/IResponse.interface'

const ListProgramsPage = () => {
	const [programs, setPrograms] = useState<IProgramInterface[]>()

	const getPrograms = async () => {
		try {
			const response: IResponseInterface<IProgramInterface[]> = await api<
				IProgramInterface[]
			>({
				url: '/api/programs/all',
			})

			if (response.success) {
				if (response.data) {
					setPrograms(response.data)
					console.log(response.data)
				}
			}
		} catch (error: any) {
			console.log(error)
		}
	}

	useEffect(() => {
		getPrograms()
	}, [])
	return (
		<div>
			<h1>Programs Page</h1>
			{programs ? (
				programs.map((program, index) => (
					<ProgramCard program={program} key={index} />
				))
			) : (
				<Loader />
			)}
		</div>
	)
}
export default ListProgramsPage
