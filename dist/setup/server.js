import { ExpressServer } from "../components/server-component/v1.0.0/ExpressServer.js";
import { IntegratedServer } from "../components/server-component/v1.0.0/IntegratedServer.js";
import { ChatServiceRoutes } from "../components/server-component/v1.0.0/routes/ChatServiceRoutes.js";
import { MessageServiceRoutes } from "../components/server-component/v1.0.0/routes/MessageServiceRoutes.js";
import { UserServiceRoutes } from "../components/server-component/v1.0.0/routes/UserServiceRoutes.js";
import { SocketioServer } from "../components/server-component/v1.0.0/SocketioServer.js";
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
