import { IResponseInterface } from '../../config/interfaces/IResponse.interface'
import { useState, useEffect } from 'react'
import api from '../../config/api'
import { ICompanyInterface } from '../../config/interfaces/ICompany.interface'
import ListCompanyComponent from '../../components/Company/ListCompany'
import Loader from '../../components/Loader'

const ListCompany = () => {
	const [companies, setCompanies] = useState<ICompanyInterface[]>([])
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
					console.log(response.data)
				}
			}
		} catch (error: any) {
			console.log(error)
		}
	}
	useEffect(() => {
		getCompanies()
	}, [])
	return (
		<div>
			{companies ? <ListCompanyComponent companies={companies} /> : <Loader />}
		</div>
	)
}
export default ListCompany
