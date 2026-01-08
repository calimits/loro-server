import { iSocketStorage } from "../../components/service-component/v1.0.0/socket-interface/iSocketStorage.js";
declare class SocketStorage implements iSocketStorage {
    joinSockets2Room(clientIDs: string[], room: string): void;
    setScoket(socket: any, clientID: string): void;
    deleteSocket(clientID: string): void;
    getSocketID(clientID: string): string;
    getAllSocketsIDs(): string[];
    getManySocketsIDs(clientIDs: string): string[];
}
export { SocketStorage };
