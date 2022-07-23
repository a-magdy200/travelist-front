import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent/CardContent'
import CardActions from '@mui/material/CardActions/CardActions'
import { NavLink } from 'react-router-dom'
import Box from '@mui/material/Box'
import Rating from '@mui/material/Rating'
import Typography from '@mui/material/Typography'
import { ICountryShowProps } from '../../config/interfaces/ICountryShowProps.interface'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'
import Container from '@mui/material/Container'

const CountryListComponent = ({ country }: ICountryShowProps) => {
	return (
		<Container sx={{ mb: 2 }}>
			<Card variant={'outlined'}>
				<CardContent>
					<Box display={'flex'} mb={2} alignItems={'center'}>
						<Typography variant={'h4'}>{country?.name} </Typography>
						<Rating name="read-only" value={country?.average_rate} readOnly />
					</Box>
				</CardContent>
				<CardActions sx={{ ml:1 }}>
					<NavLink to={`/country/show/${country?.id}`}>
						<Button
							className="show-country"
							variant="contained"
							endIcon={<KeyboardDoubleArrowRightIcon fontSize="large" />}
						>
							Country page
						</Button>
					</NavLink>
				</CardActions>
			</Card>
		</Container>
	)
}
export default CountryListComponent
