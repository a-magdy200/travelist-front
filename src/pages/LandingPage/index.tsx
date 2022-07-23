import { IProgramInterface } from '../../config/interfaces/IProgram.interface'
import { useEffect, useState } from 'react'
import { IResponseInterface } from '../../config/interfaces/IResponse.interface'
import api from '../../config/api'
import LandingPageComponent from '../../components/LandingPage'
import FooterComponent from '../../components/Footer'
import SearchComponent from '../../components/search.tsx'
import FilterComponent from '../../components/FilterBar'
import Loader from '../../components/Loader'
import Box from '@mui/material/Box'
import { toast } from 'react-toastify'

const LandingPage = () => {
	const [programs, setPrograms] = useState<IProgramInterface[]>([])
	const [isLoading, setIsLoading] = useState(false);
	const getPrograms = async () => {
		toast.info("Loading....");
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
				}
			}
			toast.success("Get Data Successfully");

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
			
			<div>
				{programs ? <LandingPageComponent programs={programs} /> : <></>}

				<FooterComponent />
			</div>
		</div>
	)
}
export default LandingPage
