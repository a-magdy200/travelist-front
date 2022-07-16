import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import api from '../../config/api'
import { useEffect, useState } from 'react'
import { Stack } from '@mui/material'
import { ICountryInterface } from '../../config/interfaces/ICountry.interface'

import { IResponseInterface } from '../../config/interfaces/IResponse.interface'

export default function CountrySelect() {
	const [country, setCountry] = useState<ICountryInterface | null>(null)
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

	console.log(country)

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
				value={country}
				onChange={(event: any, newValue: ICountryInterface | null) =>
					setCountry(newValue)
				}
				renderInput={(params) => (
					<TextField
						{...params}
						label="Country"
						inputProps={{
							...params.inputProps,
							autoComplete: 'new-password'
						}}
					/>
				)}
			/>
		</Stack>
	)
}
