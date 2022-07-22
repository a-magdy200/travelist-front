import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import api from '../../config/api'
import { useEffect, useState } from 'react'
import { Stack } from '@mui/material'
import { ICountryInterface } from '../../config/interfaces/ICountry.interface'
import { IResponseInterface } from '../../config/interfaces/IResponse.interface'
import { ICountrySetProps } from '../../config/interfaces/ICountrySetProps.interface'

export default function CountrySelect({setCountry,label}:ICountrySetProps) {
	//const [country, setCountry] = useState<ICountryInterface >('')
    const [value, setValue] = useState<ICountryInterface >()
	const [countries, setCountries] = useState<ICountryInterface[]>([{id:0, name:''}])


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

	return (
		<Stack>
			<Autocomplete
				id="country-select"
				sx={{ width: 300 }}
				options={countries}
				autoHighlight
				getOptionLabel={(option) => option.name}
				renderOption={(props, option) => (
					<Box component="li" {...props}>
						{option.name}
					</Box>
				)}
				value={value}
				onChange={(event: any, newValue: ICountryInterface | null) =>
					setCountry(newValue?.id)
				}
				renderInput={(params) => (
					<TextField
						{...params}
						label={label}
						inputProps={{
							...params.inputProps,
							autoComplete: 'new-password',
						}}
					/>
				)}
			/>
		</Stack>
	)
}
