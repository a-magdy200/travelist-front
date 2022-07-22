import { IResponseInterface } from '../../config/interfaces/IResponse.interface'
import { useState, useEffect } from 'react'
import api from '../../config/api'
import { ICompanyInterface } from '../../config/interfaces/ICompany.interface'
import Loader from '../../components/Loader'
import { useParams } from 'react-router-dom'
import ShowCompanyComponent from '../../components/Company/ShowCompany'

const CompanyDetails = () => {
	const [company, setCompany] = useState<ICompanyInterface>()
	const { id } = useParams()
	const getCompanies = async () => {
		try {
			const response: IResponseInterface<ICompanyInterface> =
				await api<ICompanyInterface>({
					url: `/api/companies/show/${id}`,
				})

			if (response.success) {
				if (response.data) {
					setCompany(response.data)
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
			{company ? <ShowCompanyComponent company={company} /> : <Loader />}
		</div>
	)
}
export default CompanyDetails
