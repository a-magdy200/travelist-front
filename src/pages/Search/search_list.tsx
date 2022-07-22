import * as React from 'react';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import ListCompanyComponent from '../../components/Company/ListCompany';
import ListHotelsComponent from '../../components/hotels/ListHotels';
import ListProgramsComponent from '../../components/programs/ListPrograms';
import api from '../../config/api';
import { IHotelInterface } from '../../config/interfaces/IHotel.interface';
import { IProgramInterface } from '../../config/interfaces/IProgram.interface';
import { IResponseInterface } from '../../config/interfaces/IResponse.interface';
import { SearchType } from '../../config/types/search.type';


const SearchList = () => {
    const {type} = useParams()
    const [searchParams] = useSearchParams()
    const keyword = searchParams.get('keyword')
    const [data, setData] = useState<any>()
    let searchType: SearchType | null = null
    console.log(type)
    console.log(keyword)
    if (type !== 'undefined') {
        searchType = type as SearchType
    }
    console.log(searchType);
    
    const getData = async () => {
		try {
			const response: IResponseInterface<any> = await api({
				url: `/api/search/${searchType}?keyword=${keyword}`,
			})

			if (response.success) {
				if (response.data) {
                    console.log(response.data);
					setData(response.data)
				}
			}
		} catch (error: any) {
			console.log(error)
		}
	}
	useEffect(() => {
		getData()
	}, [])

    const showData = (type: SearchType) => {
        switch (type) {
            case 'traveler':
                return <div>Traveler list</div>

            case 'company':
                return data ? <ListCompanyComponent companies={data} />
                : (
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
                return <div>Country list</div>

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
        <div>
            {(data && searchType) ? showData(searchType!) : console.log("error")}
        </div>
    )
}

export default SearchList;