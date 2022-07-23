import { Socket } from "socket.io-client";
import { toast } from "react-toastify";

const socketListeners = (socket: Socket) => {
  socket.on('connect', () => {
    toast.success("You are connected");
  });
  socket.on("receive message", () => {
    if(window.location.pathname.indexOf("chat") === -1) {
      toast.info("You have a new message");
    }
  })
  socket.on("notification", (notification) => {
    toast.info(notification.content);
  })
  socket.onAny((s: Socket) => {
    console.log(s);
  })
  socket.on('disconnect', () => {
    toast.error("You are disconnected");
  });
}
export default socketListeners;
