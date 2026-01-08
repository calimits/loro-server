import { socketioServer } from "./IntegratedServerAndSocketServerInstance.js";
import { SocketIOEmitter } from "./SocketIOEmitter.js";
import { socketStorage } from "./SocketStorageInstance.js";
export const socketEmitter = new SocketIOEmitter(socketioServer.getServer(), socketStorage);
