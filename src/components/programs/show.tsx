import { useState, useEffect } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import api from '../../config/api'
import { IProgramInterface } from '../../config/interfaces/IProgram.interface'
import { IResponseInterface } from '../../config/interfaces/IResponse.interface'
import Button from '@mui/material/Button'
import Loader from '../Loader'
const ShowProgramComponent = () => {
	const [program, setProgram] = useState<IProgramInterface>()
	const { id } = useParams()
	const getProgram = async () => {
		try {
			const response: IResponseInterface<IProgramInterface> =
				await api<IProgramInterface>({
					url: `/programs/show/${id}`,
				})

			if (response.success) {
				if (response.data) {
					setProgram(response.data)
					console.log(response.data)
				}
			}
		} catch (error: any) {
			console.log(error)
		}
	}
	useEffect(() => {
		getProgram()
	}, [])
	return (
		<div>
			program?
			<NavLink to={`/cycle/create`}><Button
												className="createButton"
												variant="contained"
												color="success"
												>
                                                Create Cycle
			    						</Button>
			</NavLink>
			<h1>{program?.name}</h1>
			<h1>{program?.id}</h1>
			:
			<Loader/>
			
		</div>
	)
}
export default ShowProgramComponent
/*	useEffect(() => {
		fetch('http://localhost:4000/programs/show/' + id)
			.then((res) => {
				return res.json()
			})
			.then((res) => {
				console.log(res.data)
				setProgram(res.data)
			})
			.catch((e) => {
				console.log(e)
			})
	}, [])
	*/