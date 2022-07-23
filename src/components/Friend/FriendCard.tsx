import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { IFriendShowProps } from "../../config/interfaces/IFriendShowProps.interface";
import Avatar from "@mui/material/Avatar";
import { IResponseInterface } from "../../config/interfaces/IResponse.interface";
import api from "../../config/api";
import { IFriendInterface } from "../../config/interfaces/IFriend.interface";
import config from "../../config/app_config/config";
import useAuth from "../../hooks/useAuth";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const FriendCard = ({ friend }: IFriendShowProps) => {
  const { user } = useAuth();
  const removeFriend = async (id: number | undefined) => {
    if (window.confirm("Are you sure?")) {
      console.log(id);
      try {
        const response: IResponseInterface<IFriendInterface> =
          await api<IFriendInterface>({
            url: `/api/travelers/delete/${id}`,
            method: "DELETE"
          });

        if (response.success) {
          toast.success("deleted successfully");
        }
      } catch (error: any) {
        console.log(error);
      }
    }
  };
  return (
    <Box mb={2}>
      <Card variant={"outlined"}>
        <Box display={"flex"} alignItems={"center"} p={2}>
          <Avatar
            src={`${config.apiUrl}/${user.id === friend.traveler_sender.userId ? friend.traveler_receiver.user.profile_picture : friend.traveler_sender.user.profile_picture}`}
            sx={{ width: 50, height: 50 }}
          />
          <Box ml={2} display={"flex"} alignItems={"center"}>
            <Link
              to={`/traveler/${user.id === friend.traveler_sender.userId ? friend.traveler_receiver.id : friend.traveler_sender.id}`}>
              <Typography variant={"h5"}>
                {user.id === friend.traveler_sender.userId ? friend.traveler_receiver.user.name : friend.traveler_sender.user.name}
              </Typography>
            </Link>
            <Box ml={2}>
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  removeFriend(friend.sender_id);
                }}
              >
                Delete
              </Button>
            </Box>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};
export default FriendCard;
