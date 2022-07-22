import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';
import { IRateSetProps } from '../../config/interfaces/IRateSetProps.interface';

const RateFilter=({setRate}:IRateSetProps)=>{
    const [value, setValue] = useState('');

    const changeRate = (event: SelectChangeEvent) => {
      setValue(event.target.value as string);
      setRate(Number(event.target.value))
    };
    return(
        
        <Box sx={{ width: 200 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Rate</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={value}
            label="Rate"
            onChange={changeRate}
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
export default RateFilter