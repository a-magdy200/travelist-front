import ShowCycleComponent from '../../components/cycles/ShowCycle'
import { useEffect, useState } from 'react'
import { ICycleInterface } from '../../config/interfaces/ICycle.interface'
import { useParams } from 'react-router-dom'
import { IResponseInterface } from '../../config/interfaces/IResponse.interface'
import api from '../../config/api'
import { ICycleShowProps } from '../../config/interfaces/ICycleShowProps.interface'
import { toast } from 'react-toastify'
import Loader from '../../components/Loader'
import DisplayErrorsList from '../../components/DisplayErrors/DisplayErrorsList'

const ShowCycle = () => {
	const [cycle, setCycle] = useState<ICycleInterface>()
	const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);
	const { id } = useParams()
	const getCycle = async () => {
		toast.info("Getting Cycle....");
		setErrors([]);
		setIsLoading(true);
		try {
			const response: IResponseInterface<ICycleInterface> =
				await api<ICycleInterface>({
					url: `/api/cycles/show/${id}`,
				})

			if (response.success) {
				if (response.data) {
					setCycle(response.data)
					toast.success("Getting cycle successfully");
				}
			}
		} catch (error: any) {
			setErrors(error?.response?.data?.errors || []);
			toast.error("An error has occurred");
	   
		}
		setIsLoading(false);
	}
	useEffect(() => {
		getCycle()
	}, [])
	if (isLoading) {
		return <Loader/>
	  }
	return (
		<div>
			{
			cycle ? <ShowCycleComponent cycle={cycle} /> 
			:
            <DisplayErrorsList errors={errors} />
			 }
		</div>
	)
}
export default ShowCycle
