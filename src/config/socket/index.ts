import io from "socket.io-client";
import config from "../app_config/config";

const socket = io(config.webSocketUrl, {});
export default socket;
