import Grid from "@mui/material/Grid";
import { ICompanyShowProps } from "../../config/interfaces/ICompanyShowProps.interface";

const Company = ({ company }: ICompanyShowProps) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        Description:
      </Grid>
      <Grid item xs={6}>
        {company.description}
      </Grid>
      <Grid item xs={6}>
        Average rate:
      </Grid>
      <Grid item xs={6}>
        {company.average_rate}
      </Grid>
      <Grid item xs={6}>
        Ratings count:
      </Grid>
      <Grid item xs={6}>
        {company.ratings_count}
      </Grid>
    </Grid>
  );
};

export default Company;
