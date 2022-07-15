import { IProgramInterface } from "../../config/interfaces/IProgram.interface"
import { useEffect, useState } from 'react'
import { IResponseInterface } from "../../config/interfaces/IResponse.interface"
import api from "../../config/api"
import LandingPageComponent from "../../components/LandingPage"
import FooterComponent from "../../components/Footer"
import SearchComponent from "../../components/search.tsx"
import FilterComponent from "../../components/FilterBar"

const LandingPage = () => {
    const [programs, setPrograms] = useState<IProgramInterface[]>([])
    const getPrograms = async () => {
		try {
			const response: IResponseInterface<IProgramInterface[]> = await api<
				IProgramInterface[]
			>({
				url: '/programs/all',
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
		{
		programs ? 
        <div>
        <SearchComponent /> 
        <FilterComponent /> 
        <LandingPageComponent programs={programs} /> 
        <FooterComponent /> 
        </div>
		:
        <div>
        <SearchComponent /> 
        <FilterComponent /> 
		 <div>not found</div>
         <FooterComponent /> 
        </div> 

	    }
		 </div>
   
}
export default LandingPage