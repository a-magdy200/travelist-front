import Profile from '../../components/Profile/Profile'
import Company from '../../components/Profile/Company'
import { useEffect, useState } from 'react'
import api from '../../config/api'
import { ITravelerRegisterRequestBody } from '../../config/interfaces/ITravelerRegisterRequestBody'
import { IResponseInterface } from '../../config/interfaces/IResponse.interface'
import Traveler from '../../components/Profile/Traveler'
const TravelerData = () => {
	const [traveler, setTravelerProfile] = useState<ITravelerRegisterRequestBody>()
	const getMyProfile = async () => {
		try {
			const response: IResponseInterface<ITravelerRegisterRequestBody> =
				await api<ITravelerRegisterRequestBody>({
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
		getMyProfile()
	}, [])
	return (

			<>
					{traveler ? <Traveler traveler={traveler} /> : <div>not found</div>}
			</>
	)
}

export default TravelerData
