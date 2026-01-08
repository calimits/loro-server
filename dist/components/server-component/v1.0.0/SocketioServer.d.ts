import { iSocketServer } from "./iSocketServer.js";
import { Server as ServerIo } from "socket.io";
import http from 'http';
import { iSocketStorage } from "../../service-component/v1.0.0/socket-interface/iSocketStorage.js";
declare class SocketioServer implements iSocketServer {
    private io;
    private socketStorage;
    constructor(socketStorage: iSocketStorage);
    getServer(): ServerIo;
    initialize(server: http.Server): void;
    setUpSocketListeners(): this;
}
export { SocketioServer };
