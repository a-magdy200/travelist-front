import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { IFriendRequestShowProps } from "../../config/interfaces/IFriendRequestShowProps.interface";
import Avatar from "@mui/material/Avatar";
import { IResponseInterface } from "../../config/interfaces/IResponse.interface";
import api from "../../config/api";
import { IFriendRequestInterface } from "../../config/interfaces/IFriendRequest.interface";
import Typography from "@mui/material/Typography";
import config from "../../config/app_config/config";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const FriendRequestCard = ({ friendRequest }: IFriendRequestShowProps) => {
  const acceptRequest = async (id: number | undefined) => {
    try {
      toast.info("Accepting request");
      const response: IResponseInterface<IFriendRequestInterface> =
        await api<IFriendRequestInterface>({
          url: `/api/friendrequests/accept/${id}`,
          method: "PUT"
        });

      if (response.success) {
        toast.success("Accepted")
      }
    } catch (error: any) {
      console.log(error);
      toast.error("An error has occurred");
    }
  };


  const rejectRequest = async (id: number | undefined) => {
    try {
      toast.info("Rejecting request");
      const response: IResponseInterface<IFriendRequestInterface> =
        await api<IFriendRequestInterface>({
          url: `/api/friendrequests/reject/${id}`,
          method: "PUT"
        });

      if (response.success) {
        toast.success("Rejected")
        window.location.reload();
      }
    } catch (error: any) {
      console.log(error);
      toast.error("An error has occurred");
    }
  };
  return (

    <Box mb={2}>
      <Card variant={"outlined"}>
        <Box display={"flex"} alignItems={"center"} p={2}>
          <Avatar
            alt=""
            src={`${config.apiUrl}/${friendRequest.sender.user.profile_picture}`}
            sx={{ width: 56, height: 56 }}

          />
          <Box ml={2} display={"flex"} alignItems={"center"}>
            <Link to={`/traveler/${friendRequest.sender.id}`}>
              <Typography variant={"h5"}>
                {friendRequest.sender.user.name}
              </Typography>
            </Link>
            <Box ml={2}>
              <Button
                variant="contained"
                size="medium"
                onClick={() => {
                  acceptRequest(friendRequest.sender.id);
                }}
              >
                Accept
              </Button>
            </Box>
            <Box ml={2}>

              <Button
                variant="outlined"
                size="medium"
                onClick={() => {
                  rejectRequest(friendRequest.sender.id);
                }}
              >
                Reject
              </Button>
            </Box>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};
export default FriendRequestCard;
