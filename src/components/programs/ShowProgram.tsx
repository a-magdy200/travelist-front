import { NavLink } from 'react-router-dom'
import Button from '@mui/material/Button'
import Loader from '../Loader'
import { IProgramShowProps } from '../../config/interfaces/IProgramShowProps.interface'
const ShowProgramComponent = ({ program }: IProgramShowProps) => {
	return (
		<div>
			{program ? (
				<div>
					<NavLink to={`/cycle/create/${program.id}`}>
						<Button
							className="createButton"
							variant="contained"
							color="success"
						>
							Create Cycle
						</Button>
					</NavLink>
					<h1>{program?.name}</h1>
					<h1>{program?.id}</h1>
					<NavLink to={`/program/list`}>
						{' '}
						<Button className="createButton" variant="contained">
							Back
						</Button>
					</NavLink>
				</div>
			) : (
				<Loader />
			)}
		</div>
	)
}
export default ShowProgramComponent
