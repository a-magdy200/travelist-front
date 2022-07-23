import { IResponseInterface } from '../../config/interfaces/IResponse.interface'
import { useState, useEffect } from 'react'
import api from '../../config/api'
import { ICompanyInterface } from '../../config/interfaces/ICompany.interface'
import Loader from '../../components/Loader'
import { useParams } from 'react-router-dom'
import ShowCompanyComponent from '../../components/Company/ShowCompany'
import { toast } from 'react-toastify'
import DisplayErrorsList from '../../components/DisplayErrors/DisplayErrorsList'

const CompanyDetails = () => {
	const [company, setCompany] = useState<ICompanyInterface>()
	const [isLoading, setIsLoading] = useState(false)
	const [errors, setErrors] = useState([])
	const { id } = useParams()
	const getCompanies = async () => {
		toast.info('Getting Companies....')
		setErrors([])
		setIsLoading(true)
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
			toast.success('Getting Companies Successfully')
		} catch (error: any) {
			setErrors(error?.response?.data?.errors || [])
			toast.error('An error has occurred')
		}
		setIsLoading(false)
	}
	useEffect(() => {
		getCompanies()
	}, [])
	if (isLoading) {
		return <Loader />
	}
	return (
		<div>
			{company ? (
				<ShowCompanyComponent company={company} />
			) : (
				<DisplayErrorsList errors={errors} />
			)}
		</div>
	)
}
export default CompanyDetails
