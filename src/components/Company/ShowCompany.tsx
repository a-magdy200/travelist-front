import * as React from 'react';
import { ICompanyShowProps } from "../../config/interfaces/ICompanyShowProps.interface"
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { TabPanelProps } from "../../config/interfaces/ITabPanelProps.interface";
import CompanyDetailsComponent from './DetailsCompany';
import CompanyProgramComponent from './ProgramCompany';
function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

const ShowCompanyComponent=({company}:ICompanyShowProps)=>{
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };   
return<div>
    {
     company?    
     <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Informations" {...a11yProps(0)} />
          <Tab label="programs" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
              <CompanyDetailsComponent company={company}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
              <CompanyProgramComponent programs={company.programs}/>
      </TabPanel>
     
    </Box>
    
    :
    <div>Not Found</div>
   }
</div>
}

export default ShowCompanyComponent