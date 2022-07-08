import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const ShowCycle = () => {
	const [cycle, setCycle] = useState<Cycle>()
	const { id } = useParams()
	interface Cycle {
		id: number
		name: string
		departure_date: string
		arrival_date: string
		departure_location: Country
		arrival_location: Country
		max_seats:number
		current_seats:number
	}

	interface Country {
		id: number
		name: string
	}

	useEffect(() => {
		fetch('http://localhost:4000/cycles/show/' + id)
			.then((res) => {
				return res.json()
			})
			.then((res) => {
				console.log(res.data)
				setCycle(res.data)
			})
			.catch((e) => {
				console.log(e)
			})
	}, [])
	return (
		<div className="createContainer">
			<div className="TopCycle">
					<h1>Show Cycle</h1>
					<h2>Cycle ID:{cycle?.id}</h2>
         			<h2>Cycle Name:{cycle?.name}</h2>
			</div>
			<div className="bottom">
					<h1>Cycle Details</h1>
					<h2>Max Seats:{cycle?.max_seats}</h2>
         			<h2>Current Seats:{cycle?.current_seats}</h2>
			</div>
		</div>
	)
}
export default ShowCycle
