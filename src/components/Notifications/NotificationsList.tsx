import { INotificationInterface } from "../../config/interfaces/entities/INotification.interface";
import NotificationItem from "./NotificationItem";
import Grid from "@mui/material/Grid";

const NotificationsList = ({notifications}: {notifications: INotificationInterface[]}) => {
  return (
    <Grid container spacing={2}>
      {notifications.map((notification) => (
        <NotificationItem notification={notification} key={notification.id} />
      ))}
    </Grid>
  );
}
export default NotificationsList;
