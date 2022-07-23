import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import {
  INotificationInterface,
  NotificationStatusEnum
} from "../../config/interfaces/entities/INotification.interface";
import moment from "moment";
import { blue, grey } from "@mui/material/colors";

const NotificationItem = ({notification}: {notification: INotificationInterface}) => {
  return (
    <Grid item xs={12}>
      <Card variant={"outlined"} sx={{
        backgroundColor: notification.status === NotificationStatusEnum.UNREAD ? blue[50] : grey[50]
      }}>
        <Box p={2}>
          <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
            <Typography variant={"h6"}>
              {notification.title}
            </Typography>
            <Typography variant={"caption"}>
              {moment(notification.created_at).format("MM-DD-YYYY, hh:mmA")}
            </Typography>
          </Box>
          <Typography variant={"body1"}>
            {notification.content}
          </Typography>
        </Box>
      </Card>
    </Grid>
  )
}
export default NotificationItem
