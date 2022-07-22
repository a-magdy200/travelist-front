import {Grid} from "@mui/material";
import {IListDetailsProps} from "../../config/interfaces/props/IListDetailsProps";
import Typography from "@mui/material/Typography";
import {Fragment} from "react";

const ListDetails = ({details}: IListDetailsProps) => {
  return (
    <Grid container spacing={2}>
      {Object.keys(details).map((key, index) => (
        <Fragment key={key}>
          <Grid item xs={6}>
            <Typography sx={{textTransform: "capitalize"}} variant={"h6"}>
              {key.replaceAll("_", " ")}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            {details[key]}
          </Grid>
        </Fragment>
      ))}
    </Grid>
  );
}
export default ListDetails;
