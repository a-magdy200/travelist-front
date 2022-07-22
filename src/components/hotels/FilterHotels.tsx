import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import api from '../../config/api';
import { IHotelInterface } from '../../config/interfaces/IHotel.interface';
import { IHotelListProps } from '../../config/interfaces/IHotelListProps.interface';
import { IResponseInterface } from '../../config/interfaces/IResponse.interface';
import CountryFilter from '../FilterBar/CountryFilter';
import RateFilter from '../FilterBar/RateFilter';
import StarFilter from '../FilterBar/StarFilter';

const FilterCompanyComponent=({hotels, setFilteredHotels}:IHotelListProps)=>{
    const [star, setStar] = useState<number>(0)
    const [country, setCountry] = useState<number>(0)
    const [rate, setRate] = useState<number>(0)

	const changeFilteredHotels=()=>{
     setFilteredHotels([...hotels])
     if(star!==0)
    {  setFilteredHotels(hotels?.filter(hotel => {
		if (hotel.stars) {
			return hotel.stars>=star
		}
		return false;
	  }))
    }
    if(country!==0)
    { setFilteredHotels((previous:IHotelInterface[])=>previous?.filter(hotel => {
		if (hotel.country?.id) {
			return hotel.country?.id===country
		}
		return false;
	  }))
    }

    if(rate!==0)
    { setFilteredHotels((previous:IHotelInterface[])=>previous?.filter(hotel => {
      if (hotel.average_rate) {
        return hotel.average_rate>=rate
      }
      return false;
      }))
      }
    if(rate===0&&country===0&&star===0)
    {
      setFilteredHotels([...hotels])
 
    }

    }
    useEffect(() => {
		changeFilteredHotels()
	}, [star,rate,country])
    return (
          <Box display={"flex"}>
				<CountryFilter setCountry={setCountry} label="Country"/>
				<StarFilter setStar={setStar}/>
				<RateFilter setRate={setRate}/>
			
			</Box>
    );
}
export default FilterCompanyComponent