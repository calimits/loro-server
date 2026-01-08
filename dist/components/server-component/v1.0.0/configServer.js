import { ExpressServer } from "./ExpressServer.js";
import http from 'http';
import { SocketioServer } from "./SocketioServer.js";
import { socketStorage } from "./SocketStorageInstance.js";
import { IntegratedServer } from "./IntegratedServer.js";
import { SocketIOEmitter } from "./SocketIOEmitter.js";
//express server
const expressServer = new ExpressServer(3000, "localhost");
expressServer.configGlobalMiddleWare();
//http server
let expressApp = expressServer.getServer();
const httpServer = http.createServer(expressApp);
//web socket server
const socketioServer = new SocketioServer(socketStorage);
socketioServer.initialize(httpServer);
//socket emitter (uses io)
const socketEmitter = new SocketIOEmitter(socketioServer.getServer(), socketStorage);
//config endpoints routes (services depend on iSockets 2 send messages)
expressServer.configRoutes();
const server = new IntegratedServer(3000, httpServer);
export { server, socketEmitter };
