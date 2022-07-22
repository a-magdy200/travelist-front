import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { IGroupShowProps } from "../../config/interfaces/IGroupShowProps.interface";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent/CardContent";
import CardActions from "@mui/material/CardActions/CardActions";
import { NavLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import Chip from "@mui/material/Chip";
import { CheckOutlined } from "@ant-design/icons";

const SingleGroupComponent = ({ group }: IGroupShowProps) => {
  const { user } = useAuth();
  const isFollowing: boolean =!!group?.followers?.length && !!group.followers.find(({ id }) => id === user.id);
  return (
    <Box mb={2}>
      <Card variant={"outlined"}>
        <CardContent>
					<Box display={"flex"} mb={2} alignItems={"center"}>
						<Typography variant={"h4"}>{group?.country?.name}</Typography>
						<Rating name="read-only" value={group?.country?.average_rate} readOnly />
					</Box>
          <Grid
            container
            spacing={2}
          >
            <Grid item xs={12}>
              <Box display={"flex"} alignItems={"center"}>
                <span>Followers Count :</span>
                <span>{group?.followers_count}</span>
                {isFollowing ? (
                  <Box ml={2}>
                    <Chip label={<Box>Following <CheckOutlined/></Box>} color={"secondary"} />
                  </Box>
                ) : null}
              </Box>
            </Grid>
            <Grid item xs={12}>
              Posts Count : {group?.posts?.length}
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <NavLink to={`/group/show/${group?.id}`}>
            <Button className="createButton" variant="contained">
              Show Group
            </Button>
          </NavLink>
        </CardActions>
      </Card>
    </Box>
  );
};
export default SingleGroupComponent;
