import { ICompanyShowProps } from "../../config/interfaces/ICompanyShowProps.interface";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const CompanyCard=({company}:ICompanyShowProps)=>{
    return(
        <Card sx={{ maxWidth: 545 }}>
        <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="company Cover"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {company.user.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {company.description}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
           Rating: {company.average_rate}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Show More</Button>
        </CardActions>
      </Card>
)
}
export default CompanyCard