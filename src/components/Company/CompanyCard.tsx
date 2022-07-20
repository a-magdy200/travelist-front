import { ICompanyShowProps } from "../../config/interfaces/ICompanyShowProps.interface";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { NavLink } from "react-router-dom";
import Rating from '@mui/material/Rating';
import * as React from 'react';


const CompanyCard=({company}:ICompanyShowProps)=>{
  const [rate, setRate] = React.useState<number>(0);

    return(
        <Card sx={{ maxWidth: 945 ,m:2}}>
        <CardMedia
          component="img"
          height="100"
          image={`http://localhost:4000/${company.cover_picture}`}
          alt="company Cover"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {company.user?.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {company.description}
          </Typography>
          <Rating name="read-only" value={company.average_rate} readOnly />           
        </CardContent>
        <CardActions>
        <NavLink to={`/company/show/${company.id}`}>
						{' '}
            <Button size="small">Show More</Button>
					</NavLink>
        </CardActions>
      </Card>
)
}
export default CompanyCard