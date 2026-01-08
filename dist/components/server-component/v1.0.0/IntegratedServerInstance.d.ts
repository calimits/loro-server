import { iMultiprotocolServer } from "./iMultiProtocolServer.js";
import { iSocketServer } from "./iSocketServer.js";
declare const socketioServer: iSocketServer;
declare const server: iMultiprotocolServer;
export { server, socketioServer };
