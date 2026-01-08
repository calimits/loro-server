interface iSocketStorage {
    joinSockets2Room(clientIDs: string[], room: string): void;
    setScoket(socketID: string, clientID: string): void;
    deleteSocket(socketID: string): void;
    getSocketID(clientID: string): string | undefined;
    getClientID(socketID: string): string | undefined;
}
export { iSocketStorage };
