import { setDefaultResultOrder } from 'dns'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import ListCompanyComponent from '../../components/Company/ListCompany'
import CountryListComponent from '../../components/Country/CountryListComponent'
import ListHotelsComponent from '../../components/hotels/ListHotels'
import ListProgramsComponent from '../../components/programs/ListPrograms'
import TravelerListComponent from '../../components/Traveler/TravelerListComponent'
import api from '../../config/api'
import { ICountryInterface } from '../../config/interfaces/ICountry.interface'
import { IHotelInterface } from '../../config/interfaces/IHotel.interface'
import { IProgramInterface } from '../../config/interfaces/IProgram.interface'
import { IResponseInterface } from '../../config/interfaces/IResponse.interface'
import { ITravelerInterface } from '../../config/interfaces/ITraveler.interface'
import { SearchType } from '../../config/types/search.type'

const SearchList = () => {
	const { type } = useParams()
	const [searchParams] = useSearchParams()
	const keyword = searchParams.get('keyword')
	const [data, setData] = useState<any>()
	const [error, setError] = useState<string>('')
	let searchType: SearchType | null = null
	if (type !== 'undefined') {
		searchType = type as SearchType
	}

	const getData = async () => {
		try {
			const response: IResponseInterface<any> = await api({
				url: `/api/search/${searchType}?keyword=${keyword}`,
			})

			if (response.success) {
				if (response.data) {
					console.log(response.data)
					setData(response.data)
				}
			}
		} catch (error: any) {
			console.log(error)
		}
	}
	useEffect(() => {
		getData()
	}, [keyword])

    console.log(error)
	const showData = (type: SearchType) => {
		switch (type) {
			case 'traveler':
				return data ? (
					data.map((traveler: ITravelerInterface, index: number) => (
						<TravelerListComponent traveler={traveler} key={index} />
					))
				) : (
					<div>No result found</div>
				)

			case 'company':
				return data ? (
					<ListCompanyComponent companies={data} />
				) : (
					<div>No results found</div>
				)

			case 'program':
				return data ? (
					data.map((program: IProgramInterface, index: number) => (
						<ListProgramsComponent program={program} key={index} />
					))
				) : (
					<div>No result found</div>
				)

			case 'country':
				return data ? (
					data.map((country: ICountryInterface, index: number) => (
						<CountryListComponent country={country} key={index} />
					))
				) : (
					<div>No result found</div>
				)

			case 'hotel':
				return data ? (
					data.map((hotel: IHotelInterface, index: number) => (
						<ListHotelsComponent hotel={hotel} key={index} />
					))
				) : (
					<div>No results found</div>
				)

			default:
				return <div>Something's went wrong!</div>
		}
	}

	return (
		<div>{ showData(searchType!) }</div>
	)
}

export default SearchList
