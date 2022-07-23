import UserBasicInfo from '../../components/Profile/UserBasicInfo'
import Company from '../../components/Profile/Company'
import { useEffect, useState } from 'react'
import api from '../../config/api'
// import { ITravelerRegisterRequestBody } from '../../config/interfaces/ITravelerRegisterRequestBody'
import { IResponseInterface } from '../../config/interfaces/IResponse.interface'
import DisplayTravelerData from '../../components/Profile/DisplayTravelerData'
import { ITravelerReview } from '../../config/interfaces/ITravelerReview.interface'
import Loader from "../../components/Loader";
import { toast } from 'react-toastify'
const TravelerData = () => {
	const [traveler, setTravelerProfile] = useState<ITravelerReview>()
	const [isLoading, setIsLoading] = useState(false);
	   const getMyProfile = async () => {
		toast.info("Getting Data....");
        setIsLoading(true);
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
		toast.success("Getting Data Successfully");
		} catch (error: any) {
			toast.error("An error has occurred");
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
