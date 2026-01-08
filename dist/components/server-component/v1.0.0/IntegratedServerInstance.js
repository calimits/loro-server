import { httpServer } from "./httpServerInstance.js";
import { IntegratedServer } from "./IntegratedServer.js";
import { SocketioServer } from "./SocketioServer.js";
const socketioServer = new SocketioServer();
socketioServer.initialize(httpServer);
const server = new IntegratedServer(3000, httpServer);
export { server, socketioServer };
