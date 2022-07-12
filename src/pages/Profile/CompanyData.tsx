import Profile from '../../components/Profile/Profile'
import Company from '../../components/Profile/Company'
import { useEffect, useState } from 'react'
import api from '../../config/api'
import Stack from '@mui/material/Stack'
import { useParams } from 'react-router-dom'
import { ICompanyInterface } from '../../config/interfaces/ICompany.interface'
import { IResponseInterface } from '../../config/interfaces/IResponse.interface'
const CompanyData = () => {
	const [company, setCompany] = useState<ICompanyInterface>()
	const { id } = useParams()
	console.log(id)
	const getCompanyProfile = async () => {
		try {
			const response: IResponseInterface<ICompanyInterface> =
				await api<ICompanyInterface>({
					url: `/api/companies/3`,
					method: 'GET',
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
		getCompanyProfile()
	}, [])
	return (

			<>
				{/* to view all base data from user and company */}

					{company ? <Company company={company} /> : <div>not found</div>}
			</>
	)
}

export default CompanyData
