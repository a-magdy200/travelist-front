import { IProgramInterface } from '../../config/interfaces/IProgram.interface'
import { IResponseInterface } from '../../config/interfaces/IResponse.interface'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import api from '../../config/api'
import ProgramDataComponent from '../../components/programs/ProgramData'



const ShowProgramUser = () => {
	const [program, setProgram] = useState<IProgramInterface>()
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
				}
			}
		} catch (error: any) {
			console.log(error)
		}
	}
	useEffect(() => {
		getProgram()
	}, [])
	return <div>
		{
		program ? 
		<ProgramDataComponent program={program} /> 
		:
		 <div>not found</div>
	    }
		 </div>
}
export default ShowProgramUser
