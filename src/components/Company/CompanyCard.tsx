import { ICompanyShowProps } from "../../config/interfaces/ICompanyShowProps.interface";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";
import Rating from "@mui/material/Rating";
import * as React from "react";
import Box from "@mui/material/Box";
import config from "../../config/app_config/config";

const CompanyCard = ({ company }: ICompanyShowProps) => {
  return (
    <Box mb={2}>
      <Card variant={"outlined"}>
        <CardMedia
          component="img"
          height="100"
          image={`${config.apiUrl}/${company.cover_picture}`}
          alt="company Cover"
        />
        <CardContent>
          <Box display={"flex"} flexDirection={"column"}>
            <Box display={"flex"} alignItems={"center"}>
              <Typography gutterBottom variant="h5" component="div">
                {company.user?.name}
              </Typography>
              <Box ml={2}>
                <Rating name="read-only" value={company.average_rate} readOnly />
              </Box>
            </Box>
            <Typography mb={1} variant="body1" color="text.secondary">
              {company.description}
            </Typography>
            <Typography mb={2} variant="body2" color="text.secondary">
              Programs count: {company?.programs?.length}
            </Typography>
            <NavLink to={`/company/show/${company.id}`}>
              <Button variant={"contained"}>Show More</Button>
            </NavLink>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
export default CompanyCard;
