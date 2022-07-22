import TextField from '@mui/material/TextField'
import SearchIcon from '@mui/icons-material/Search'
const SearchComponent = () => {
	return (
		<div className="searchContainer">
			<TextField id="standard-basic" label="Anywhere" variant="standard" />
			<SearchIcon color="primary" />
		</div>
	)
}
export default SearchComponent
