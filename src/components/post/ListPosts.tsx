import Loader from "../Loader";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import moment from "moment";
import CardContent from "@mui/material/CardContent/CardContent";
import { Link } from "react-router-dom";
import { IPostShowProps } from "../../config/interfaces/IPostShowProps.interface";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ReportIcon from "@mui/icons-material/Report";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import useAuth from "../../hooks/useAuth";
import { blueGrey } from "@mui/material/colors";

const ListPostsComponent = ({ post }: IPostShowProps) => {
  const { user } = useAuth();
  return (
    <Box mb={2}>
      {post ? (
        <div>
          <Card variant={"outlined"}>
            <CardContent>
              <Grid
                container
                spacing={2}
              >
                {post.traveler.userId === user.id ? (
                  <Grid item xs={12}>
                    <Box display={"flex"} alignItems={"center"}>
                      <Link to={`/post/edit/${post.id}`}>
                        <Button color={"secondary"} variant={"contained"}>
                          Edit
                          <EditIcon />
                        </Button>
                      </Link>
                      <Box ml={2}>
                        <Link
                          to={"/post/delete/" + post.id}
                          state={{ groupId: post.groupId }}
                        >
                          <Button color={"error"} variant={"contained"}>
                            Delete
                            <DeleteIcon />
                          </Button>
                        </Link>
                      </Box>
                    </Box>
                  </Grid>
                ) : (
                  <Grid item xs={12}>
                    <Link
                      to={"/post/report/" + post.id}
                      state={{ groupId: post.groupId }}>
                      <Button color={"warning"} variant={"contained"}>
                        Report
                        <ReportIcon />
                      </Button>
                    </Link>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <Box p={2} sx={{
                    backgroundColor: blueGrey[50]
                  }}>
                    <Typography variant={"body1"}>{post.content}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      Created By: {post.traveler.user.name}
                    </Grid>
                    <Grid item xs={6}>
                      Created At: {moment(post.created_at).format("MM-DD-YYYY, hh:mmA")}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <div>
            <p></p>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </Box>
  );
};
export default ListPostsComponent;
