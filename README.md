## Fetch example

```tsx
import { useEffect, useState } from 'react'
import { Hotel } from '../config/interfaces/Hotel'

// This should be declared in a diffrent file
export interface Hotel {
	id: number
	name: string
}

const ExampleFetch = () => {
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [hotels, setHotels] = useState<Hotel[]>([])
	useEffect(() => {
		;(async () => {
			const response = await fetch('http://localhost:4000/api/hotels')
			const jsonData = await response.json()
			if (jsonData.success) {
				setHotels(jsonData.data)
			} else {
				alert('Error')
			}
			setTimeout(() => {
				setIsLoading(false)
			}, 3000)
		})()
	}, [])

	if (isLoading) {
		return <h1>Loading...</h1>
	}
	return (
		<div>
			{hotels.map((hotel) => (
				<h2 key={hotel.id}>{hotel.name}</h2>
			))}
		</div>
	)
}
```
