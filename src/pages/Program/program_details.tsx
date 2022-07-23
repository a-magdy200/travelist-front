import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { IProgramInterface } from '../../config/interfaces/IProgram.interface'
import { IResponseInterface } from '../../config/interfaces/IResponse.interface'
import api from '../../config/api'
import ProgramDetailsComponent from '../../components/programs/ProgramDetails'
import Loader from '../../components/Loader'
import { toast } from 'react-toastify'

const ProgramDetailsPage = () => {
	const [program, setProgram] = useState<IProgramInterface>()
	const { id } = useParams()
	const [isLoading, setIsLoading] = useState(false);

	const getProgram = async () => {
		toast.info("Getting Program....");
		setIsLoading(true);
		try {
			const response: IResponseInterface<IProgramInterface> =
				await api<IProgramInterface>({
					url: `/api/programs/show/${id}`,
				})
			if (response.success) {
				if (response.data) {
					setProgram(response.data)
				}
			}
			toast.success("Get Program Successfully");
		} catch (error: any) {
			toast.error("An error has occurred");
			console.log(error)
		}
		setIsLoading(false);
	}
	useEffect(() => {
		getProgram()
	}, [])
	if (isLoading) {
		return <Loader/>
	  }
	return (
		<div>
			{program ? <ProgramDetailsComponent program={program} /> : <div>Not Found</div>}
		</div>
	)
}
export default ProgramDetailsPage
