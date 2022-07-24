import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { ITravelerSearchProps } from "../../config/interfaces/ITravelerSearchProps.interface";
import Avatar from "@mui/material/Avatar";
import config from "../../config/app_config/config";
import Badge from "@mui/material/Badge";
import Rating from "@mui/material/Rating";

const TravelerListComponent = ({ traveler }: ITravelerSearchProps) => {
  return (
    <Box mb={2}>
      <Card variant={"outlined"} sx={{ height: 160, width: 1000, mb: 1 }}>
        <CardContent sx={{ m: 0.5 }}>
          <Grid
            container
            spacing={2}
          >
            <Grid item xs={2}>
              {traveler.is_guide ? (
              	<Badge
              		overlap="circular"
              		anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              		badgeContent="guide"
              		color="success"
              	>
              		<Avatar
              			sx={{ width: 120, height: 120, mb: 2 }}
              			alt="User Avatar"
              			src={
              				traveler?.user.profile_picture
              					? `${config.apiUrl}/${traveler.user.profile_picture}`
              					: ''
              			}
              			color={'primary'}
              		></Avatar>
              	</Badge>
              ) : (
              <Avatar
                sx={{ width: 120, height: 120, mb: 2 }}
                alt="User Avatar"
                src={
                  traveler?.user.profile_picture
                    ? `${config.apiUrl}/${traveler.user.profile_picture}`
                    : ""
                }
                color={"primary"}
              ></Avatar>
              )}
            </Grid>
            <Box sx={{ mt: 3 }}>
              <Link to={`/traveler/${traveler.user.id}`}>
                <Typography variant={"h5"} sx={{ mb: 2 }} gutterBottom>{traveler?.user.name}</Typography>
              </Link>
              <Rating name="read-only" value={traveler?.average_rate} readOnly />
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box display={"flex"} alignItems={"center"}>
                    <span>Address: </span>
                    <Typography ml={1}>{traveler.user.address}</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default TravelerListComponent;
