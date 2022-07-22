import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useEffect, useState } from 'react';
import { IResponseInterface } from '../../config/interfaces/IResponse.interface';
import { ICountryInterface } from '../../config/interfaces/ICountry.interface';
import api from '../../config/api';
import { ICompanySetProps } from '../../config/interfaces/ICompanySetProps.interface';
import { ICompanyInterface } from '../../config/interfaces/ICompany.interface';

const CompanyFilter=({setCompany}:ICompanySetProps)=>{
    const [value, setValue] = useState('');
    const [companies, setCompanies] = useState<ICompanyInterface[]>([]);

    const changeCompany = (event: SelectChangeEvent) => {
      setCompany(Number(event.target.value) );
      setValue(event.target.value as string)
    };
    const getCompanies = async () => {
		try {
			const response: IResponseInterface<ICompanyInterface[]> = await api<
				ICompanyInterface[]
			>({
				url: '/api/companies/',
			})

			if (response.success) {
				if (response.data) {
					setCompanies(response.data)
				}
			}
		} catch (error: any) {
			console.log(error)
		}
	}
    useEffect(() => {
		getCompanies()
	}, [])

    return(
        
        <Box sx={{ width: 200 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Company</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={value}
            label="country"
            onChange={changeCompany}
          >
           <MenuItem value={0}>All</MenuItem>
            {
             companies.map((company) => (
                <MenuItem value={company.id}>
                    {company.user?.name}
                </MenuItem>
            ))
            }
            
          </Select>
        </FormControl>
      </Box>
      );
}
export default CompanyFilter