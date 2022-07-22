import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SearchType } from '../../config/types/search.type'

const SearchField = () => {
	const searchTypeOptions = [
		'traveler',
		'company',
		'program',
		'country',
		'hotel',
	]
	const [type, setType] = useState<SearchType | null>(searchTypeOptions[0] as SearchType)
	const [keyword, setKeyword] = useState<string | null>('')
    const navigate = useNavigate()

	return (
		<Box>
			{/* <TextField id="outlined-search" label="Search keyword" type="search" /> */}
			<TextField
                sx={{ mx: 0.5 }}
				id="outlined-helperText"
				label="search keyword"
                size='small'
				value={keyword}
				onChange={(
					event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
				) => setKeyword(event.target.value)}
			/>
            <Select
                sx={{ mx: 0.5 }}
                id="type-select"
                size='small'
                value={type}
                label="Age"
                onChange={(event: any) => setType(event.target.value)}
			>
				{searchTypeOptions.map((option) => (
					<MenuItem key={option} value={option}>
						{option}
					</MenuItem>
				))}
            </Select>
			{/* <TextField
				id="outlined-select-currency"
				select
                size='small'
                variant='outlined'
				label="Select"
				value={type}
				onChange={(event: any) => setType(event.target.value)}
			>
				{searchTypeOptions.map((option) => (
					<MenuItem key={option} value={option}>
						{option}
					</MenuItem>
				))}
			</TextField> */}
			<Button
                sx={{ mx: 0.5 }}
				variant="contained"
				color="secondary"
				size="medium"
                disableElevation
				onClick={() => {
					navigate(`/search/${type}?keyword=${keyword}`)
				}}
			>
				Search
			</Button>
		</Box>
	)
}

export default SearchField
