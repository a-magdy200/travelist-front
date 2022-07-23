import { IResponseInterface } from '../../config/interfaces/IResponse.interface'
import { useState, useEffect } from 'react'
import api from '../../config/api'
import { ICompanyInterface } from '../../config/interfaces/ICompany.interface'
import ListCompanyComponent from '../../components/Company/ListCompany'
import Loader from '../../components/Loader'
import FilterCompanyComponent from '../../components/Company/FilterCompany'
import { toast } from 'react-toastify'
import DisplayErrorsList from '../../components/DisplayErrors/DisplayErrorsList'

const ListCompany = () => {
	const [companies, setCompanies] = useState<ICompanyInterface[]>([])
	const [filteredCompanies, setFilteredCompanies] =
		useState<ICompanyInterface[]>()
	const [errors, setErrors] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const getCompanies = async () => {
		toast.info('Getting Companies....')
		setErrors([])
		setIsLoading(true)
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
			toast.success('Getting Companies Successfully')
		} catch (error: any) {
			setErrors(error?.response?.data?.errors || [])
			toast.error('An error has occurred')
		}
	}
	useEffect(() => {
		getCompanies().then(() => setIsLoading(false))
	}, [])
	if (isLoading) {
		return <Loader />
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
				<DisplayErrorsList errors={errors} />
			)}
		</div>
	)
}
export default ListCompany
