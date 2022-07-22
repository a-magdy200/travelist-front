import { Dispatch, SetStateAction } from 'react'

export interface ICustomInputFieldProps {
	value: string
	setValue: Dispatch<SetStateAction<string>>
	type: string
	label: string
}
