import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Button from '@mui/material/Button'

const ShowProgram = () => {
	const [program, setProgram] = useState<Data>()
	let { id } = useParams()
	interface Data {
		id: number
		name: string
		company: Company
		price: number
		is_Recurring: boolean
		transportation: Transportation
	}

	interface Company {
		id: number
		name: string
	}

	interface Transportation {
		id: number
		name: string
	}
	useEffect(() => {
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
	return (
		<div>
			<Button variant="contained" type="submit">Create Cycle</Button>
			<h1>{program?.name}</h1>
			<h1>{program?.id}</h1>
		</div>
	)
}
export default ShowProgram
