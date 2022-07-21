import { IProgramInterface } from '../../config/interfaces/IProgram.interface'
import { IProgramsShowProps } from '../../config/interfaces/IProgramListProps'
import ProgramCard from '../programs/ProgramCard'

const CompanyProgramComponent = ({ programs }: IProgramsShowProps) => {
	console.log(programs)
	return (
		<div>
			{programs.length ? (
				programs.map((program: IProgramInterface, index) => (
					<ProgramCard program={program} key={index} />
				))
			) : (
				<div>No Programs Yet</div>
			)}
		</div>
	)
}
export default CompanyProgramComponent
