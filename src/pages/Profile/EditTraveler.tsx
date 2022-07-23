import { useState, useEffect } from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField/TextField'
import Button from '@mui/material/Button'
import Radio from '@mui/material/Radio'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import RadioGroup from '@mui/material/RadioGroup/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import ProfilePictureChanger from '../../components/Profile/ProfilePictureChanger'
import { useNavigate } from 'react-router-dom'
import { GenderType } from '../../config/types/gender.type'
import { ITravelerInterface } from '../../config/interfaces/ITraveler.interface'
import { IResponseInterface } from '../../config/interfaces/IResponse.interface'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { formatDate } from '../../config/helpers/formatDateFunction'
import api from '../../config/api'
import { useContext } from 'react'
import AuthContext from '../../contexts/AuthContext'
import Loader from "../../components/Loader";
import { toast } from 'react-toastify'
import DisplayErrorsList from '../../components/DisplayErrors/DisplayErrorsList'
const EditTraveler = () => {
	const LoggedInUser: any = useContext(AuthContext)
	const [gender, set_gender] = useState<GenderType>('male')
	const [national_id, set_national_id] = useState('')
	const [is_guide, set_is_guide] = useState(false)
	const [date_of_birth, set_date_of_birth] = useState('')
	const [isLoading, setIsLoading] = useState(false);
	const [errors, setErrors] = useState([]);
  
	const navigate = useNavigate()
	const getTravelerData = async () => {
		try {
			const response: IResponseInterface<ITravelerInterface> =
				await api<ITravelerInterface>({
					url: `/api/travelers/profile`,
				})

			if (response.success) {
				if (response.data) {
					set_gender(response.data.gender)
					set_national_id(response.data.national_id)
					set_date_of_birth(response.data.date_of_birth)
					set_is_guide(response.data.is_guide)
				}
			}
		} catch (error: any) {
			console.log(error)
		}
	}
	useEffect(() => {
		getTravelerData().then(() => {
			setIsLoading(false);
		})
	}, [])
	async function sendData(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		toast.info("Editing Profile....");
        setErrors([]);
        setIsLoading(true);
		const requestBody = {
			date_of_birth,
			gender,
			is_guide,
			national_id,
		}
		console.log('requestBody', requestBody)
		try {
			const response: IResponseInterface<ITravelerInterface> =
				await api<ITravelerInterface>({
					url: `/api/travelers/`,
					method: 'PUT',
					body: JSON.stringify(requestBody),
				})
			console.log('response', response)
			if (response.success) {
				navigate(`/${LoggedInUser.user.type}`)
			}
		toast.success("Editing Successfully");
		} catch (error: any) {
			setErrors(error?.response?.data?.errors || []);
            toast.error("An error has occurred");
			console.log(error)
		}
	    setIsLoading(false);

	}


	if (isLoading) {
		return <Loader/>
	}
	return (
		<div
			className="container"
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<div className="left">
					<form onSubmit={sendData}>
							<h2>Edit Details</h2>
							<div>
							<DisplayErrorsList errors={errors} />
								<TextField
									id="outlined-multiline-flexible"
									type="number"
									label="National ID"
									size="small"
									fullWidth
									maxRows={4}
									value={national_id}
									onChange={(e) => {
										set_national_id(e.target.value)
									}}
								/>
							</div>
							<FormControl>
								<FormLabel id="demo-row-radio-buttons-group-label gender">
									Gender
								</FormLabel>
								<RadioGroup
									row
									value={gender}
									aria-labelledby="demo-row-radio-buttons-group-label"
									name="row-radio-buttons-group"
									onChange={(e) => {
										set_gender(e.target.value as GenderType)
									}}
								>
									<FormControlLabel
										value="male"
										control={<Radio />}
										label="Male"
									/>
									<FormControlLabel
										value="female"
										control={<Radio />}
										label="Female"
									/>
								</RadioGroup>
							</FormControl>
							<div>
								<LocalizationProvider dateAdapter={AdapterDateFns}>
									<DatePicker
										inputFormat="yyyy-MM-dd"
										label="Date of Birth"
										value={date_of_birth}
										onChange={(newValue) => {
											if (newValue) {
												set_date_of_birth(formatDate(newValue))
											}
										}}
										renderInput={(params) => <TextField {...params} />}
									/>
								</LocalizationProvider>
							</div>
							<div>
								<FormControlLabel
									control={<Checkbox checked={is_guide} />}
									label="Is Guide"
									onChange={(e) => {
										set_is_guide(!is_guide)
									}}
								/>
							</div>
							<Button variant="contained" type="submit">
								Update
							</Button>
					</form>
			</div>
		</div>
	)
}

export default EditTraveler
