import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import api from "../../config/api";
import {
  INotificationInterface,
  NotificationStatusEnum
} from "../../config/interfaces/entities/INotification.interface";
import NotificationsList from "../../components/Notifications/NotificationsList";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import socket from "../../config/socket";

const Notifications = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [notifications, setNotifications] = useState<INotificationInterface[]>([]);
  const markAllAsRead = () => {
    toast.info('Marking all as read...');
    api({
      url: '/api/admin/notifications/read',
      method: 'post'
    }).then(() => {
      setNotifications(previous => previous.map(notification => ({
        ...notification,
        status: NotificationStatusEnum.READ,
      })));
      toast.success('Success');
    }).catch(e => {
      toast.error("An error has occurred");
    })
  }
  useEffect(() => {
    api<INotificationInterface[]>({
      url: '/api/admin/notifications'
    }).then(response => {
      if (response.data) {
        setNotifications(response.data);
      }
    }).catch(e => {
      toast.error("An error has occurred");
    }).finally(() => {
      setIsLoading(false);
    });
    socket.on("notification", notification => {
      setNotifications(previous => [notification].concat(previous));
    });
  }, []);
  if (isLoading) {
    return <Loader/>
  }
  return (
    <Box p={2}>
      <Box mb={1} display={"flex"} justifyContent={"center"}>
        <Button onClick={markAllAsRead}>
          Mark all as read
        </Button>
      </Box>
      <NotificationsList notifications={notifications} />
    </Box>);
};
export default Notifications;
