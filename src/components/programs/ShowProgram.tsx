import { NavLink } from 'react-router-dom'
import Button from '@mui/material/Button'
import Loader from '../Loader'
import { IProgramShowProps } from '../../config/interfaces/IProgramShowProps.interface'
import CardActions from '@mui/material/CardActions'
import ProgramDataComponent from './ProgramData'
const ShowProgramComponent = ({ program }: IProgramShowProps) => {
	return (
		<div>
			{program ? (
				<div>
					{program.is_Recurring ? (
						<NavLink to={`/cycle/create/${program.id}`}>
							<Button className="createButton" variant="contained">
								Create Cycle
							</Button>
						</NavLink>
					) : (
						<></>
					)}

					<ProgramDataComponent program={program} />
					<CardActions>
						<NavLink to={`/program/list`}>
							{' '}
							<Button className="createButton" variant="contained">
								Back
							</Button>
						</NavLink>
					</CardActions>
				</div>
			) : (
				<Loader />
			)}
		</div>
	)
}
export default ShowProgramComponent
