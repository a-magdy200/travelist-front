import UserBasicInfo from '../../components/Profile/UserBasicInfo'
import Company from '../../components/Profile/Company'
import { useEffect, useState } from 'react'
import api from '../../config/api'
// import { ITravelerRegisterRequestBody } from '../../config/interfaces/ITravelerRegisterRequestBody'
import { IResponseInterface } from '../../config/interfaces/IResponse.interface'
import DisplayTravelerData from '../../components/Profile/DisplayTravelerData'
import { ITravelerReview } from '../../config/interfaces/ITravelerReview.interface'
import Loader from "../../components/Loader";
const TravelerData = () => {
	const [traveler, setTravelerProfile] = useState<ITravelerReview>()
	const [isLoading, setIsLoading] = useState(true);
	const getMyProfile = async () => {
		try {
			const response: IResponseInterface<ITravelerReview> =
				await api<ITravelerReview>({
					url: `/api/travelers/profile`,
					method: 'GET',
				})

			if (response.success) {
				if (response.data) {
					setTravelerProfile(response.data)
				}
			}
		} catch (error: any) {
			console.log(error)
		}
	}
	useEffect(() => {
		getMyProfile().then(() => {
			setIsLoading(false);
		})
	}, [])
	if (isLoading) {
		return <Loader/>
	}
	return (
		<>{traveler ? <DisplayTravelerData traveler={traveler} /> : <div>not found</div>}</>
	)
}

export default TravelerData
