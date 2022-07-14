import { NavLink } from 'react-router-dom'
import Button from '@mui/material/Button'
import Loader from '../Loader'
import { IProgramShowProps } from '../../config/interfaces/IProgramShowProps.interface'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import { IHotelInterface } from '../../config/interfaces/IHotel.interface'
import { ICountryInterface } from '../../config/interfaces/ICountry.interface'
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
					
					<ProgramDataComponent program={program}/>
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
