import { ICompanyInterface } from '../../config/interfaces/ICompany.interface'
import { ICompanyListProps } from '../../config/interfaces/ICompanyListProps'
import CompanyCard from './CompanyCard'

const ListCompanyComponent = ({ companies }: ICompanyListProps) => {
	return (
		<div>
			{companies.length ? (
				companies.map((company: ICompanyInterface, index) => (
					<CompanyCard company={company} key={index} />
				))
			) : (
				<div>Not Found</div>
			)}
		</div>
	)
}

export default ListCompanyComponent
