import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { ICountryInterface } from '../../config/interfaces/ICountry.interface';
import { IProgramInterface } from '../../config/interfaces/IProgram.interface';
import { IProgramsShowProps } from '../../config/interfaces/IProgramListProps';
import CountrySelect from '../Country/CountrySelect';
import CompanyFilter from '../FilterBar/CompanyFilter';
import CountryFilter from '../FilterBar/CountryFilter';
import PriceFilter from '../FilterBar/PriceFilter';
import RateFilter from '../FilterBar/RateFilter';

const FilterProgramComponent=({programs, setFilteredPrograms}:IProgramsShowProps)=>{
    const [departureCountry, setDepartureCountry] = useState<number>(0)
    const [destinationCountry, setDestinationCountry] = useState<number>(0)
    const [company, setCompany] = useState<number>(0)
    const [rate, setRate] = useState<number>(0)
    const [price, setPrice] = useState<number[]>([])

	const changeFilteredPrograms=()=>{
     setFilteredPrograms([...programs])
        
    if(rate!==0)
    { setFilteredPrograms((previous:IProgramInterface[])=>previous?.filter(program => {
      if (program.average_rate) {
        return program.average_rate>=rate
      }
      return false;
      }))
    }

    if(departureCountry!==0)
    { setFilteredPrograms((previous:IProgramInterface[])=>previous?.filter(program => {
      if (program.country.id) {
        return program.country.id===departureCountry
          }
      return false;
      }))
    }

    if(destinationCountry!==0)
    { setFilteredPrograms((previous:IProgramInterface[])=>previous?.filter(program => {
      if (program.destinations.length) {
        return program.destinations.find((destination:ICountryInterface)=>(destination.id==destinationCountry))
          }
      return false;
      }))
    }

    if(company!==0)
    { setFilteredPrograms((previous:IProgramInterface[])=>previous?.filter(program => {
      if (program.company.id) {
        return program.company.id===company
          }
      return false;
      }))
    }

    if(price.length!==0)
    { setFilteredPrograms((previous:IProgramInterface[])=>previous?.filter(program => {
      if (program.price) {
        return program.price>=price[0]&&program.price<=price[1]
          }
      return false;
      }))
    }

     if(rate===0&& departureCountry===0&&destinationCountry===0 &&company===0&&price.length===0)
    {
      setFilteredPrograms([...programs])
 
    }

    }
    useEffect(() => {
		changeFilteredPrograms()
	}, [rate,departureCountry,destinationCountry,company,price])
    return (
          <Box display={"flex"}>
      	<CountryFilter setCountry={setDepartureCountry} label="Departure Country"/>
				<CountryFilter setCountry={setDestinationCountry} label="Destination Country"/>
        <CompanyFilter setCompany={setCompany} />
        <RateFilter setRate={setRate}/>
        <PriceFilter setPrice={setPrice}/>

		</Box>
    );
}
export default FilterProgramComponent