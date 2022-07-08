import Loader from '../Loader'
import {ICycleInterface} from "../../config/interfaces/ICycle.interface";
interface ICycleShowProps {
	cycle: ICycleInterface;
}
const ShowCycleComponent = ({cycle}: ICycleShowProps) => {
	return (
		<div className="createContainer">
			{cycle ?
				<>
					<div className="TopCycle">
						<h1>Show Cycle</h1>
						<h2>Cycle ID:{cycle?.id}</h2>
						<h2>Cycle Name:{cycle?.name}</h2>
					</div>
					<div className="bottom">
						<h1>Cycle Details</h1>
						<h2>Max Seats:{cycle?.max_seats}</h2>
						<h2>Current Seats:{cycle?.current_seats}</h2>
					</div>
				</>
				:
				<Loader/>}
		</div>
	)
}
export default ShowCycleComponent
