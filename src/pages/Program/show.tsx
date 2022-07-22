import ShowProgramComponent from '../../components/programs/ShowProgram'
import { IProgramInterface } from '../../config/interfaces/IProgram.interface'
import { IResponseInterface } from '../../config/interfaces/IResponse.interface'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import api from '../../config/api'
import Loader from "../../components/Loader";

const ShowProgram = () => {
	const [program, setProgram] = useState<IProgramInterface>()
	const [isLoading, setIsLoading] = useState(true);
	const { id } = useParams()
	const getProgram = async () => {
		try {
			const response: IResponseInterface<IProgramInterface> =
				await api<IProgramInterface>({
					url: `/api/programs/show/${id}`,
				})

			if (response.success) {
				if (response.data) {
					setProgram(response.data)
					console.log(response.data)
				}
			}
		} catch (error: any) {
			console.log(error)
		}
	}
	useEffect(() => {
		getProgram().then(() => setIsLoading(false))
	}, [])
	if (isLoading) {
		return <Loader />
	}
	return (
		<div>
			{program ? (
				<ShowProgramComponent program={program} />
			) : (
				<div>not found</div>
			)}
		</div>
	)
}
export default ShowProgram
