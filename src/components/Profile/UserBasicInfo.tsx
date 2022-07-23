import * as React from "react";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { IUserShowProps } from "../../config/interfaces/IUserShowProps.interface";
import Avatar from "@mui/material/Avatar";
import config from "../../config/app_config/config";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { CheckOutlined } from "@ant-design/icons";
import { IResponseInterface } from "../../config/interfaces/IResponse.interface";
import { IFriendRequestInterface } from "../../config/interfaces/IFriendRequest.interface";
import api from "../../config/api";
import { toast } from "react-toastify";

const UserBasicInfo = ({ user, isFriend, friendRequest, travelerId }: IUserShowProps) => {
  const [isFriendRequestSent, setIsFriendRequestSent] = useState(false);
  const sendRequest = async () => {
    try {
      toast.info("Sending friend request...");
      const response: IResponseInterface<IFriendRequestInterface> =
        await api<IFriendRequestInterface>({
          url: `/api/friendrequests/send/${travelerId}`,
          method: "POST"
        });
      if (response.success) {
        if (response.data) {
          toast.success("Friend request sent");
          setIsFriendRequestSent(true);
        }
      }
    } catch (error: any) {
      toast.error("An error has occurred");
      console.log(error);
    }
  };
  return (
    <Box mb={2}>
      <Typography variant="h5">
        Profile
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Avatar
            src={user.profile_picture !== "" ? `${config.apiUrl}/${user.profile_picture}` : undefined}
          />
        </Grid>
        <Grid item xs={6}>
          {isFriend ? (
            <Chip color={"secondary"} label={<Box>Friends <CheckOutlined /></Box>} />
          ) : friendRequest || isFriendRequestSent ? (
            <Chip color={"primary"} label={"Friend Request Sent"} />
          ) : (
            <Button onClick={sendRequest} variant={"contained"} color={"secondary"}>
              Add friend
            </Button>
          )}
        </Grid>
        <Grid item xs={6}>
          Name:
        </Grid>
        <Grid item xs={6}>
          {user.name}
        </Grid>
        <Grid item xs={6}>
          Email:
        </Grid>
        <Grid item xs={6}>
          {user.email}
        </Grid>
        <Grid item xs={6}>
          Type:
        </Grid>
        <Grid item xs={6}>
          {user.type}
        </Grid>
        <Grid item xs={6}>
          Location:
        </Grid>
        <Grid item xs={6}>
          {user.address}
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserBasicInfo;
