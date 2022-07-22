import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { IGroupInterface } from '../../config/interfaces/IGroup.interface';
import { IGroupsListProps } from '../../config/interfaces/IGroupsListProps.interface';
import CountryFilter from '../FilterBar/CountryFilter';

const FilterGroupComponent=({groups, setFilteredGroups}:IGroupsListProps)=>{
    const [country, setCountry] = useState<number>(0)

	const changeFilteredGroups=()=>{
     setFilteredGroups([...groups])
   
    if(country!==0)
    { setFilteredGroups((previous:IGroupInterface[])=>previous?.filter(group => {
		if (group.country.id) {
			return group.country.id===country
		}
		return false;
	  }))
    }
   
    else
    {
      setFilteredGroups([...groups])
 
    }

    }
    useEffect(() => {
      changeFilteredGroups()
	}, [country])
    return (
          <Box display={"flex"}>
				<CountryFilter setCountry={setCountry} label="country"/>
			
			</Box>
    );
}
export default FilterGroupComponent