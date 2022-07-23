import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Loader from '../../components/Loader'
import FilterProgramComponent from '../../components/programs/FilterProgram'
import ListProgramsComponent from '../../components/programs/ListPrograms'
import ProgramCard from '../../components/programs/ProgramCard'
import api from '../../config/api'
import { IProgramInterface } from '../../config/interfaces/IProgram.interface'
import { IResponseInterface } from '../../config/interfaces/IResponse.interface'

const ListProgramsPage = () => {
	const [programs, setPrograms ] = useState<IProgramInterface[]>([])
	const [filteredPrograms, setFilteredPrograms] = useState<IProgramInterface[]>([])
	const [isLoading, setIsLoading] = useState(false);

	const getPrograms = async () => {
		toast.info("Getting Programs....");
        setIsLoading(true);
	  	try {
			const response: IResponseInterface<IProgramInterface[]> = await api<
				IProgramInterface[]
			>({
				url: '/api/programs/all',
			})

			if (response.success) {
				if (response.data) {
					setPrograms(response.data)
					setFilteredPrograms(response.data)
					console.log(response.data)
				}
			}
			toast.success("Get Programs Successfully");
		} catch (error: any) {
			toast.error("An error has occurred");
			console.log(error)
		}
		setIsLoading(false);
	}

	useEffect(() => {
		getPrograms()
	}, [])
	if (isLoading) {
		return <Loader/>
	  }
	return (
		<div>
			<h1>Programs Page</h1>
			<FilterProgramComponent
			programs={programs}
			setFilteredPrograms={setFilteredPrograms}
			/>
			{filteredPrograms ? (
				filteredPrograms.map((program, index) => (
					<ProgramCard program={program} key={index} />
					))
			) : (
				<div>No Programs yet</div>
			)}
		</div>
	)
}
export default ListProgramsPage
