import { mongoClient } from "../../database-component/v1.0.0/MongoDBClientInstance.js";
import { dotenv } from "../../environment-config-component/v1.0.0/DotenvInstance.js";
import { ExpressServer } from "../../server-component/v1.0.0/ExpressServer.js";
import http from "http";
import { SocketioServer } from "../../server-component/v1.0.0/SocketioServer.js";
import { socketStorage } from "../../server-component/v1.0.0/SocketStorageInstance.js";
import { SocketIOEmitter } from "../../server-component/v1.0.0/SocketIOEmitter.js";
import { createServices } from "./utils/createServices.js";
import { createControllers } from "./utils/createControllers.js";
import { configRoutes } from "./utils/configRoutes.js";
import { IntegratedServer } from "../../server-component/v1.0.0/IntegratedServer.js";
//configuring env
dotenv.setUp();
//configuring dbclient
mongoClient.connect(String(process.env.DB));
//configuring webServer
const webServer = new ExpressServer(3000, "localhost");
webServer.configGlobalMiddleWare();
//creating http server
const httpServer = http.createServer(webServer.getServer());
//creating socket server
const socketsServer = new SocketioServer(socketStorage);
socketsServer.initialize(httpServer);
const socketEmitter = new SocketIOEmitter(socketsServer.getServer(), socketStorage);
//creating services
const { msgService, chatService, userService } = createServices(socketEmitter);
//creating controllers
const controllers = createControllers(msgService, chatService, userService);
//configuring routes
configRoutes(webServer, controllers);
//start server
const server = new IntegratedServer(3000, httpServer);
server.start();
