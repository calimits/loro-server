import { iSocketStorage } from "../../service-component/v1.0.0/socket-interface/iSocketStorage.js";
declare class SocketStorage implements iSocketStorage {
    private sockets;
    constructor();
    joinSockets2Room(clientIDs: string[], room: string): void;
    setScoket(socketID: string, clientID: string): void;
    deleteSocket(socketID: string): void;
    getSocketID(clientID: string): string | undefined;
    getClientID(socketID: string): string | undefined;
}
export { SocketStorage };
