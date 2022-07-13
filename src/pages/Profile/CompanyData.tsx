import Company from '../../components/Profile/Company'
import { useEffect, useState } from 'react'
import {useParams} from "react-router-dom";
import api from '../../config/api'
import { ICompanyInterface } from '../../config/interfaces/ICompany.interface'
import { ICompanyShowProps } from '../../config/interfaces/ICompanyShowProps.interface'
import { IResponseInterface } from '../../config/interfaces/IResponse.interface'
const CompanyData = () => {
	const [company, setCompProfile] = useState<ICompanyInterface>()
	const getUserProfile = async () => {
		try {
			const response: IResponseInterface<ICompanyInterface> =
				await api<ICompanyInterface>({
					url: `/api/companies/profile`,
					method: 'GET',
				})

			if (response.success) {
				if (response.data) {
					setCompProfile(response.data)
					console.log('response data get company',response.data)
					// console.log('id',company?.id)
				}
			}
		} catch (error: any) {
			console.log(error)
		}
	}
	useEffect(() => {
		getUserProfile()
	}, [])
		
	return (

			<>
				{/* to view all base data from user and company */}

					{company ? <Company company={company} /> : <div>not found</div>}
			</>
	)
}

export default CompanyData
