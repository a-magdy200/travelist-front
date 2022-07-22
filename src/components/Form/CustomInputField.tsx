import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import React from 'react'
import { ICustomInputFieldProps } from '../../config/interfaces/ICustomInputFieldProps'

const CustomInputField = ({
	value,
	setValue,
	type,
	label,
}: ICustomInputFieldProps) => {
	return (
		<Grid item xs={8}>
			<TextField
				className="inputText"
				type={type}
				label={label}
				variant="outlined"
				required
				value={value}
				onChange={(e) => {
					setValue(e.target.value)
				}}
			/>
		</Grid>
	)
}
export default CustomInputField
