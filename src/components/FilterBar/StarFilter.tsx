import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';
import { IStarSetProps } from '../../config/interfaces/IStarSetProps.interface';

const StarFilter=({setStar}:IStarSetProps)=>{
    const [value, setValue] = useState('');

    const changeStar = (event: SelectChangeEvent) => {
      setValue(event.target.value as string);
      setStar(Number(event.target.value))
    };
    return(
        
        <Box sx={{ width: 200 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Stars</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={value}
            label="star"
            onChange={changeStar}
          >
            <MenuItem value={0}>All</MenuItem>
            <MenuItem value={5}>5 Stars </MenuItem>
            <MenuItem value={4}>4 Stars or Above </MenuItem>
            <MenuItem value={3}>3 Stars or Above  </MenuItem>
            <MenuItem value={2}>2 Stars or Above </MenuItem>
            <MenuItem value={1}>1 Stars or Above  </MenuItem>

            
          </Select>
        </FormControl>
      </Box>
      );
}
export default StarFilter