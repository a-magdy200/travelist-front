import { IResponseInterface } from '../../config/interfaces/IResponse.interface'
import { useState, useEffect } from 'react'
import api from '../../config/api'
import { ICompanyInterface } from '../../config/interfaces/ICompany.interface'
import ListCompanyComponent from '../../components/Company/ListCompany'
import Loader from '../../components/Loader'
import FilterCompanyComponent from '../../components/Company/FilterCompany'

const ListCompany = () => {
	const [companies, setCompanies] = useState<ICompanyInterface[]>([])
	const [filteredCompanies, setFilteredCompanies] = useState<ICompanyInterface[]>()

	const [isLoading, setIsLoading] = useState(true);
	const getCompanies = async () => {
		try {
			const response: IResponseInterface<ICompanyInterface[]> = await api<
				ICompanyInterface[]
			>({
				url: '/api/companies/',
			})

			if (response.success) {
				if (response.data) {
					setCompanies(response.data)
					setFilteredCompanies(response.data)
					console.log(response.data)
				}
			}
		} catch (error: any) {
			console.log(error)
		}
	}
	useEffect(() => {
		getCompanies().then(() => setIsLoading(false))
	}, [])
	if (isLoading) {
		return <Loader/>
	}
	return (
		<div>
		<h1>Companies Page</h1>
			<FilterCompanyComponent
			companies={companies}
			setFilteredCompanies={setFilteredCompanies}
			/>
			{filteredCompanies ? (
				<ListCompanyComponent companies={filteredCompanies} /> 
			) : (
				<Loader/>
			)}
		 </div>
	)
}
export default ListCompany
