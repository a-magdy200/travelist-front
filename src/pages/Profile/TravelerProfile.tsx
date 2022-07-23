import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import api from "../../config/api";
import { ITravelerInterface } from "../../config/interfaces/ITraveler.interface";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import UserBasicInfo from "../../components/Profile/UserBasicInfo";
import DisplayTravelerData from "../../components/Profile/DisplayTravelerData";
import { IFriendRequestInterface } from "../../config/interfaces/IFriendRequest.interface";

const TravelerProfile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [travelerData, setTravelerData] = useState<ITravelerInterface>();
  const [isFriend, setIsFriend] = useState(false);
  const [friendRequest, setFriendRequest] = useState<IFriendRequestInterface>();
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      (async () => {
        try {
          toast.info("Fetching traveler profile...");
          setIsLoading(true);
          const response = await api<ITravelerInterface>({
            url: `/api/travelers/profile/${id}`
          });
          const friendResponse = await api<ITravelerInterface>({
            url: `/api/travelers/friends/${id}`
          });
          const friendRequestResponse = await api<IFriendRequestInterface>({
            url: `/api/friendrequests/has_request/${id}`
          });
          if (response.data) {
            setTravelerData(response.data);
          }
          setIsFriend(!!friendResponse.data);
          if (friendRequestResponse.data) {
            setFriendRequest(friendRequestResponse.data);
          }
          toast.success("Success");
          setIsLoading(false);
        } catch (e) {
          toast.error("An error has occurred");
        }
      })();
    }
  }, [id]);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <Box>
      {travelerData ? (
        <UserBasicInfo
          travelerId={travelerData.id}
          friendRequest={friendRequest}
          isFriend={isFriend}
          user={travelerData.user} />
      ) : null}
      {travelerData ? <DisplayTravelerData traveler={travelerData} /> : null}
    </Box>
  );
};

export default TravelerProfile;
