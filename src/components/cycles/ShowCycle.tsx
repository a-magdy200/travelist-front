import Loader from '../Loader'
import {ICycleShowProps} from "../../config/interfaces/ICycleShowProps.interface";
import { NavLink } from 'react-router-dom';
import Button from '@mui/material/Button'

const ShowCycleComponent = ({cycle}: ICycleShowProps) => {
	return (
		<div className="createContainer">
			{cycle ?
				<div>
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
					<NavLink to={`/cycle/list`}>
								{' '}
								<Button
								className="createButton"
								variant="contained"
								>
							   Back
							</Button>
							</NavLink>	

				</div>
				:
				<Loader/>}
		</div>
	)
}
export default ShowCycleComponent
