import Loader from '../Loader'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent/CardContent'
import CardActions from '@mui/material/CardActions/CardActions'
import { Link, NavLink } from "react-router-dom";
import { IHotelShowProps } from '../../config/interfaces/IHotelShowProps.interface'
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const ListHotelsComponent = ({ hotel }: IHotelShowProps) => {
	return (
		<Box mb={2}>
					<Card variant={"outlined"}>
						<CardContent>
							<Typography variant={"h5"}>{hotel.name}</Typography>
							<Grid
								container
								spacing={2}
							>
								<Grid item xs={6}>
									Hotel located in Country : {hotel.country?.name}
								</Grid>

								<Grid item xs={6}>
									Hotel Address : {hotel.address}
								</Grid>
							</Grid>
							<Link to={`/hotel/show/${hotel.id}`}>
								<Button className="createButton" variant="contained">
									Show Details
								</Button>
							</Link>
						</CardContent>
					</Card>
		</Box>
	)
}
export default ListHotelsComponent
