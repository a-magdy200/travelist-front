import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useState } from 'react';
import { IPriceSetProps } from '../../config/interfaces/IPriceSetProps.interface';

function valuetext(value: number) {
    return `${value}$`;
  }
const PriceFilter=({setPrice}:IPriceSetProps)=>{
    const [value, setValue] = useState<number[]>([20, 37]);

    const handleChange = (event: Event, newValue: number | number[]) => {
      setValue(newValue as number[]);
      setPrice(newValue as number[])
    };
   
    return(

        <Box sx={{ width: 200 }}>
        <Slider max={100000}
          getAriaLabel={() => 'Price range'}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
        />
      </Box>
    );
        
       
}
export default PriceFilter