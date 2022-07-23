import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useEffect, useState } from 'react';
import { IResponseInterface } from '../../config/interfaces/IResponse.interface';
import { ICountryInterface } from '../../config/interfaces/ICountry.interface';
import api from '../../config/api';
import { ICountrySetProps } from '../../config/interfaces/ICountrySetProps.interface';

const CountryFilter=({setCountry,label}:ICountrySetProps)=>{
    const [value, setValue] = useState('');
    const [countries, setCountries] = useState<ICountryInterface[]>([]);

    const changeCountry = (event: SelectChangeEvent) => {
      setCountry(Number(event.target.value) );
      setValue(event.target.value as string)
    };
	const getCountries = async () => {
		try {
			const response: IResponseInterface<ICountryInterface[]> = await api<
				ICountryInterface[]
			>({
				url: '/api/countries/show_all',
			})

			if (response.success) {
				if (response.data) {
					setCountries(response.data)
				}
			}
		} catch (error: any) {
			console.log(error)
		}
	}
	useEffect(() => {
		getCountries()
	}, [])


    return(
        
        <Box sx={{ width: 200 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">{label}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={value}
            label="country"
            onChange={changeCountry}
          >
           <MenuItem value={0}>All</MenuItem>
            {
             countries.map((country) => (
                <MenuItem value={country.id}>
                    {country.name}
                </MenuItem>
            ))
            }
            
          </Select>
        </FormControl>
      </Box>
      );
}
export default CountryFilter