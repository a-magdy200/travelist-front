import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent/CardContent";
import { Link, NavLink } from "react-router-dom";
import { IFeedPost } from "../../config/interfaces/IFeedPost.interface";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface IFeedPostProps {
  feedPost: IFeedPost;
}

const FeedPageComponent = ({ feedPost }: IFeedPostProps) => {
  return (
    <Box mb={2}>
      <Card variant={"outlined"}>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {feedPost.content}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            {feedPost.travelerName}
          </Typography>
          <Link to={`/group/show/${feedPost.groupId}`}>
            <Button variant="contained">
              Show Group Posts
            </Button>
          </Link>
        </CardContent>
      </Card>
    </Box>
  );
};
export default FeedPageComponent;
