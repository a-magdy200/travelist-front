import Profile from '../../components/Profile/Profile'
import Company from '../../components/Profile/Company'
import { useEffect, useState } from 'react'
import api from '../../config/api'
import { ICompanyInterface } from '../../config/interfaces/ICompany.interface'
import { IResponseInterface } from '../../config/interfaces/IResponse.interface'
const CompanyData = () => {
	const [company, setCompProfile] = useState<ICompanyInterface>()
	const getMyProfile = async () => {
		try {
			const response: IResponseInterface<ICompanyInterface> =
				await api<ICompanyInterface>({
					url: `/api/companies/profile`,
					method: 'GET',
				})

			if (response.success) {
				if (response.data) {
					setCompProfile(response.data)
				}
			}
		} catch (error: any) {
			console.log(error)
		}
	}
	useEffect(() => {
		getMyProfile()
	}, [])
	return (
		<>
			{/* to view all base data from user and company */}

			{company ? <Company company={company} /> : <div>not found</div>}
		</>
	)
}

export default CompanyData
