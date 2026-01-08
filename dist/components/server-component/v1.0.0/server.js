import { ExpressServer } from "./ExpressServer.js";
import { IntegratedServer } from "./IntegratedServer.js";
import { ChatServiceRoutes } from "./routes/ChatServiceRoutes.js";
import { MessageServiceRoutes } from "./routes/MessageServiceRoutes.js";
import { UserServiceRoutes } from "./routes/UserServiceRoutes.js";
import { SocketioServer } from "./SocketioServer.js";
//creating servers 
let socketServer = new SocketioServer();
let webServer = new ExpressServer(3000, "localhost", [
    UserServiceRoutes,
    MessageServiceRoutes,
    ChatServiceRoutes
]);
//configuring middleware
webServer.configGlobalMiddleWare();
//configuring routes
webServer.configRoutes();
//integrated server
let server = new IntegratedServer(3000, webServer, socketServer);
export { socketServer, server };
