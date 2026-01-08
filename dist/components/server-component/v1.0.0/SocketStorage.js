class SocketStorage {
    sockets;
    constructor() {
        this.sockets = [];
    }
    joinSockets2Room(clientIDs, room) {
    }
    setScoket(socketID, clientID) {
        const exists = this.sockets.some(s => s.socketID === socketID);
        if (!exists) {
            this.sockets.push({ userID: clientID, socketID });
        }
    }
    deleteSocket(socketID) {
        this.sockets = this.sockets.filter(socket => socket.socketID !== socketID);
    }
    getSocketID(clientID) {
        let socket = this.sockets.find(socket => socket.userID === clientID);
        return socket?.socketID;
    }
    getClientID(socketID) {
        let socket = this.sockets.find(socket => socket.socketID === socketID);
        return socket?.userID;
    }
}
export { SocketStorage };
