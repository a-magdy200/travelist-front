import { ICycleInterface } from '../../config/interfaces/ICycle.interface'
import { ICycleListProps } from '../../config/interfaces/ICycleListProps.interface'
import CycleCardComponent from '../cycles/CycleCard'

const ListProgramCyclesComponent = ({ cycles }: ICycleListProps) => {
	return (
		<div>
			{cycles.length ? (
				cycles.map((cycle: ICycleInterface, index) => (
					<CycleCardComponent cycle={cycle} key={index} />
				))
			) : (
				<div>Not Found</div>
			)}
		</div>
	)
}
export default ListProgramCyclesComponent
