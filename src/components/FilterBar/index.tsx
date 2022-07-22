import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';
import TourIcon from '@mui/icons-material/Tour';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DensitySmallIcon from '@mui/icons-material/DensitySmall';
const FilterComponent=()=>{

    return<div className="FilterContainer">
                <div>
                <DensitySmallIcon color="primary" />
                <HolidayVillageIcon  color="primary" />
                <TourIcon  color="primary" />
                <AttachMoneyIcon color="primary" />
                </div>
                <div className="filterTitle"> Filter </div>
              
          </div>
    }
    export default FilterComponent