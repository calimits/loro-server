import { iMultiprotocolServer } from "./iMultiProtocolServer.js";
import { iSocketEmmiter } from "../../service-component/v1.0.0/socket-interface/iSocketEmitter.js";
declare const socketEmitter: iSocketEmmiter;
declare const server: iMultiprotocolServer;
export { server, socketEmitter };
