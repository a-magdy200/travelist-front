import UserBasicInfo from '../../components/Profile/UserBasicInfo'
import Company from '../../components/Profile/Company'
import { useEffect, useState } from 'react'
import api from '../../config/api'
import { ICompanyInterface } from '../../config/interfaces/ICompany.interface'
import { IResponseInterface } from '../../config/interfaces/IResponse.interface'
import Loader from "../../components/Loader";
const CompanyData = () => {
	const [company, setCompProfile] = useState<ICompanyInterface>()
	const [isLoading, setIsLoading] = useState(true);

	const getMyProfile = async () => {
		try {
			const response: IResponseInterface<ICompanyInterface> =
				await api<ICompanyInterface>({
					url: `/api/companies/profile`,
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
		getMyProfile().then(() => {
			setIsLoading(false);
		})
	}, [])

	if (isLoading) {
		return <Loader/>
	}
	return (
		<>
			{/* to view all base data from user and company */}

			{company ? <Company company={company} /> : <div>not found</div>}
		</>
	)
}

export default CompanyData
