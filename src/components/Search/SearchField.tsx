import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchType } from "../../config/types/search.type";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import InputAdornment from "@mui/material/InputAdornment";
import { blue } from "@mui/material/colors";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

const SearchField = () => {
  const searchTypeOptions = [
    "traveler",
    "company",
    "program",
    "country",
    "hotel"
  ];
  const [type, setType] = useState<SearchType | null>(searchTypeOptions[0] as SearchType);
  const [keyword, setKeyword] = useState<string | null>("");
  const navigate = useNavigate();

  return (
    <Box p={1}
          display={"flex"} alignItems={"flex-end"}
         sx={{ mx: 0.5 }}>
      <TextField
        variant={"outlined"}
        sx={{ mx: 0.5 }}
        id="outlined-helperText"
        label="search keyword"
        size="small"
        color="primary"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchOutlinedIcon />
            </InputAdornment>
          )
        }}
        value={keyword}
        onChange={(
          event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => setKeyword(event.target.value)}
      />
      <FormControl>
        <InputLabel id="type-select">Type</InputLabel>
        <Select
          sx={{ mx: 0.5 }}
          id="type-select"
          size="small"
          value={type}
          label="Type"
          onChange={(event: any) => setType(event.target.value)}
        >
          {searchTypeOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        sx={{ mx: 0.5 }}
        variant="contained"
        color="secondary"
        size="medium"
        disableElevation
        onClick={() => {
          navigate(`/search/${type}?keyword=${keyword}`);
          setKeyword('')
        }}
      >
        Search
      </Button>
    </Box>
  );
};

export default SearchField;
