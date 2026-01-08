import { ExpressServer } from "./ExpressServer.js";
import { ChatServiceRoutes } from "./routes/ChatServiceRoutes.js";
import { MessageServiceRoutes } from "./routes/MessageServiceRoutes.js";
import { UserServiceRoutes } from "./routes/UserServiceRoutes.js";
const expressServer = new ExpressServer(3000, "localhost", [
    UserServiceRoutes,
    MessageServiceRoutes,
    ChatServiceRoutes
]);
expressServer.configGlobalMiddleWare();
expressServer.configRoutes();
export { expressServer };
