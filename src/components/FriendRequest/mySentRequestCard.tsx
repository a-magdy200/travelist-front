import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { ISentRequestShowProps } from "../../config/interfaces/ISentRequestShowProps.interface";
import Avatar from "@mui/material/Avatar";
import { IResponseInterface } from "../../config/interfaces/IResponse.interface";
import api from "../../config/api";
import { IFriendRequestInterface } from "../../config/interfaces/IFriendRequest.interface";
import config from "../../config/app_config/config";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { toast } from "react-toastify";

const MySentRequestCard = ({ mySentRequest }: ISentRequestShowProps) => {
  const cancelRequest = async (id: number | undefined) => {
    try {
      toast.info("Cancelling request...");
      const response: IResponseInterface<IFriendRequestInterface> =
        await api<IFriendRequestInterface>({
          url: `/api/friendrequests/cancel/${id}`,
          method: "DELETE"
        });

      if (response.success) {
        toast.success("Request cancelled");
      }
    } catch (error: any) {
      toast.error("An error has occurred");
      console.log(error);
    }
  };

  return (
    <Box mb={2}>
      <Card variant={"outlined"}>
        <Box display={"flex"} alignItems={"center"} p={2}>
          <Avatar
            alt=""
            src={`${config.apiUrl}/${mySentRequest.receiver.user.profile_picture}`}
            sx={{ width: 56, height: 56 }}

          />
          <Box ml={2} display={"flex"} alignItems={"center"}>
            <Link to={`/traveler/${mySentRequest.receiver.id}`}>
              <Typography variant={"h5"}>
                {mySentRequest.receiver.user.name}
              </Typography>
            </Link>
            <Box ml={2}>
              <Button
                variant="outlined"
                size="medium"
                onClick={() => {
                  cancelRequest(mySentRequest.receiver.id);
                }}
              >
                Cancel Friend Request
              </Button>
            </Box>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};
export default MySentRequestCard;
