import { NavLink } from 'react-router-dom'
import Button from '@mui/material/Button'
import Loader from '../Loader'
import { IProgramShowProps } from '../../config/interfaces/IProgramShowProps.interface'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid'

const ShowProgramComponent = ({ program }: IProgramShowProps) => {
	console.log(program)
	return (
		<div>
			{program? (
				<div>
					{
						program.is_Recurring?
						<NavLink to={`/cycle/create/${program.id}`}>
						<Button
							className="createButton"
							variant="contained"
						>
							Create Cycle
						</Button>
					</NavLink>
					:
					<></>
					}
					<Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={`http://localhost:4000/${program.cover_picture}`}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
			{program.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
		<Grid container direction="column" spacing={2} xs={10} lg={8} mb={3}>
				<Grid item xs={6}>
				  ID : {program.id}
				</Grid>
				<Grid item xs={6}>
				  Name : {program.name}
				</Grid>
				<Grid item xs={6}>
				  Price : {program.price}
				</Grid>
				<Grid item xs={6}>
				  Description : {program.description}
				</Grid>
				<Grid item xs={6}>
				  is_Recurring : {program.is_Recurring}
				</Grid>
				<Grid item xs={6}>
				  total_rating_value : {program.total_rating_value}
				</Grid>
				<Grid item xs={6}>
				  total_rating_users : {program.total_rating_users}
				</Grid>
				<Grid item xs={6}>
				  Transportation : {program.transportation.name}
				</Grid>
				
		</Grid>					
        </Typography>
      </CardContent>
      <CardActions>
	  <NavLink to={`/program/list`}>
						{' '}
						<Button className="createButton" variant="contained">
							Back
						</Button>
					</NavLink>
    </CardActions>
    </Card>
					
				</div>
			) : (
				<Loader />
			)}
		</div>
	)
}
export default ShowProgramComponent
