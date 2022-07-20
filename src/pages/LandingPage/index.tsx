import { IProgramInterface } from "../../config/interfaces/IProgram.interface"
import { useEffect, useState } from 'react'
import { IResponseInterface } from "../../config/interfaces/IResponse.interface"
import api from "../../config/api"
import LandingPageComponent from "../../components/LandingPage"
import FooterComponent from "../../components/Footer"
import SearchComponent from "../../components/search.tsx"
import FilterComponent from "../../components/FilterBar"
import Loader from "../../components/Loader"
import Box from '@mui/material/Box';

const LandingPage = () => {
    const [programs, setPrograms] = useState<IProgramInterface[]>([])
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
				}
			}
		} catch (error: any) {
			console.log(error)
		}
	}
	useEffect(() => {
		getPrograms()
	}, [])
    return <div>
		<Box  sx={{position: 'fixed',top:'12%',width:'100%'}}>
		<div>
        <SearchComponent /> 
        <FilterComponent /> 
		</div>
		</Box>
        <div>
		{
           programs?
		   <LandingPageComponent programs={programs} /> 
           :
		   <Loader/>
	    }

        <FooterComponent /> 
		</div>
	  </div>

}
export default LandingPage