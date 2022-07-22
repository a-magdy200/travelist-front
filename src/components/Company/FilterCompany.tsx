import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { ICompanyInterface } from '../../config/interfaces/ICompany.interface';
import { ICompanyListProps } from '../../config/interfaces/ICompanyListProps';
import RateFilter from '../FilterBar/RateFilter';

const FilterCompanyComponent=({companies, setFilteredCompanies}:ICompanyListProps)=>{
    const [rate, setRate] = useState<number>(0)

	const changeFilteredCompanies=()=>{
     setFilteredCompanies([...companies])
        
    if(rate!==0)
    { setFilteredCompanies((previous:ICompanyInterface[])=>previous?.filter(company => {
      if (company.average_rate) {
        return company.average_rate>=rate
      }
      return false;
      }))
      }
   else
    {
      setFilteredCompanies([...companies])
 
    }

    }
    useEffect(() => {
		changeFilteredCompanies()
	}, [rate])
    return (
          <Box display={"flex"}>
				<RateFilter setRate={setRate}/>
		</Box>
    );
}
export default FilterCompanyComponent