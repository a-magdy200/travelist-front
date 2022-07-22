import { IProgramInterface } from '../../config/interfaces/IProgram.interface'
import { IProgramsShowProps } from '../../config/interfaces/IProgramListProps'
import ProgramCard from '../programs/ProgramCard'

const LandingPageComponent = ({ programs }: IProgramsShowProps) => {
	return (
		<div className="programsContainer">
			{programs.length ? (
				programs.map((program: IProgramInterface, index) => (
					<ProgramCard program={program} key={index} />
				))
			) : (
				<div>Not Found</div>
			)}
		</div>
	)
}

export default LandingPageComponent
