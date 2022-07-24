import * as React from 'react'
import { ICountryInterface } from '../../config/interfaces/ICountry.interface'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded'
import { useEffect, useState } from 'react'
import { IResponseInterface } from '../../config/interfaces/IResponse.interface'
import api from '../../config/api'
import { useNavigate, useParams } from 'react-router-dom'
import { Container } from '@mui/system'
import config from '../../config/app_config/config'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import { Box, CardActions } from '@mui/material'
import Rating from '@mui/material/Rating'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import ListProgramsComponent from '../../components/programs/ListPrograms'
import { IProgramInterface } from '../../config/interfaces/IProgram.interface'
import { IHotelInterface } from '../../config/interfaces/IHotel.interface'
import ListHotelsComponent from '../../components/hotels/ListHotels'
import ShowCountryReviews from '../CountryReviews/show_country_reviews'
import { ICountryReview } from '../../config/interfaces/ICountryReview.interface'
import CreateCountryReviews from '../CountryReviews/create_country_review'
import { toast } from 'react-toastify'
import Loader from '../../components/Loader'
import DisplayErrorsList from '../../components/DisplayErrors/DisplayErrorsList'

export interface IShowCountryProps {
	success: boolean
	data?: ICountryInterface
}

export default function ShowCountry() {
	const { id } = useParams()
	const [country, setCountry] = useState<ICountryInterface | undefined>()
	const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);
	const [tabValue, setTabValue] = useState<string>('1')
	const navigate = useNavigate()
	const groupId: number | undefined = country ? country.group?.id : 0
	const rating: number | undefined = country ? country.average_rate : 0
	const programs: IProgramInterface[] | null =
		country && country.programs ? [...country.programs] : null

	const hotels: IHotelInterface[] | null =
		country && country.hotels ? [...country?.hotels] : null

	const reviews: ICountryReview[] | null =
		country && country.reviews ? [...country?.reviews] : null

	const coverPic: string | null =
		country && country.group
			? `${config.apiUrl}` +
			  '/uploads/programs/' +
			  `${country.group.cover_picture}`
			: ''

	const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
		setTabValue(newValue)
	}
	const getCountry = async () => {
		toast.info("Getting Country....");
		setErrors([]);
		setIsLoading(true);
		try {
			const response: IResponseInterface<any> = await api({
				url: `/api/countries/country/${id}`,
			})

			if (response.success) {
				if (response.data) {
					setCountry(response.data)
					toast.success("Getting Country Successfully");

				}
			}
		} catch (error: any) {
			setErrors(error?.response?.data?.errors || []);
			toast.error("An error has occurred");
		}
		setIsLoading(false);
	}
	useEffect(() => {
		getCountry()
	}, [])
	if (isLoading) {
		return <Loader/>
	  }
	return (
		<Container
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<Box >
				<Card sx={{ position: 'relative', width: 900, height: 400 }}>
				<DisplayErrorsList errors={errors} />
					<CardMedia
						component="img"
						image={coverPic}
						alt={country?.name}
						sx={{
							position: 'absolute',
							top: 0,
							right: 0,
							height: '100%',
							width: '100%',
						}}
					/>
					<CardContent sx={{ position: 'relative' }}>
						<Typography gutterBottom variant="h3" sx={{ fontWeight: 'bold' }}>
							{country && country.name + ' '}
							<Rating name="rating" value={rating} precision={0.5} readOnly />
						</Typography>
					</CardContent>
					<CardActions sx={{ position: 'relative', justifyContent: 'center' }}>
						<Button
							variant="outlined"
							color="inherit"
							size="large"
							sx={{ fontWeight: 'bold', elevation: 24 }}
							onClick={() => {
								navigate(`/group/show/${groupId}`)
							}}
							endIcon={<GroupsRoundedIcon fontSize="large" />}
						>
							Goto country group
						</Button>
					</CardActions>
				</Card>
				<TabContext value={tabValue}>
					<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
						<TabList
							onChange={handleTabChange}
							aria-label="lab API tabs example"
						>
							<Tab label="Reviews" value="1" />
							<Tab label="Programs" value="2" />
							<Tab label="Hotels" value="3" />
						</TabList>
					</Box>
					<TabPanel value="1">
						{reviews ? (
							<ShowCountryReviews countryReviews={reviews} />
						) : (
							<div>Error</div>
						)}
						<Button
							variant="contained"
							color="primary"
							size="medium"
							onClick={() => {
								navigate(`/countryReview/create/${country?.id}`)
							}}
						>
							Add Review
						</Button>
					</TabPanel>
					<TabPanel value="2">
						{programs ? (
							programs.map((program, index) => (
								<ListProgramsComponent program={program} key={index} />
							))
						) : (
							<div>Error</div>
						)}
					</TabPanel>
					<TabPanel value="3">
						{hotels ? (
							hotels.map((hotel, index) => (
								<ListHotelsComponent hotel={hotel} key={index} />
							))
						) : (
							<div>Error</div>
						)}
					</TabPanel>
				</TabContext>
			</Box>
		</Container>
	)
}
