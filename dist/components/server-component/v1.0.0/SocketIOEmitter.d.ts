import { Server } from "socket.io";
import { ack, iSocketEmmiter } from "../../service-component/v1.0.0/socket-interface/iSocketEmitter.js";
import { iSocketStorage } from "../../service-component/v1.0.0/socket-interface/iSocketStorage.js";
declare class SocketIOEmitter implements iSocketEmmiter {
    io: Server;
    private socketStorage;
    constructor(io: Server, socketStorage: iSocketStorage);
    emit21SocketWithAckAndRetry(to: string, event: string, data: object): Promise<ack>;
    broadcastWithAckAndRetry(to: string, event: string, data: object): Promise<ack>;
    emit2RoomWithAckAndRetry(to: string, event: string, data: object): Promise<ack>;
    getIOServer(): Server<import("socket.io").DefaultEventsMap, import("socket.io").DefaultEventsMap, import("socket.io").DefaultEventsMap, any>;
    private getFailedSockets;
}
export { SocketIOEmitter };
