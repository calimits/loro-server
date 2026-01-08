class SocketIOEmitter {
    io;
    socketStorage;
    constructor(io, socketStorage) {
        this.io = io;
        this.socketStorage = socketStorage;
    }
    async emit21SocketWithAckAndRetry(to, event, data) {
        let ack = { error: true, data: [{}] };
        let socketID = this.socketStorage.getSocketID(to);
        if (socketID === undefined)
            return ack;
        let retryAttempts = 0;
        let waitTime = 2000;
        while (retryAttempts < 5) {
            try {
                let res = await this.io.to(socketID).timeout(waitTime).emitWithAck(event, data);
                ack = res[0];
                break;
            }
            catch (error) {
                retryAttempts++;
            }
        }
        return ack;
    }
    async broadcastWithAckAndRetry(to, event, data) {
        let ack = await this.emit21SocketWithAckAndRetry(to, event, data);
        return ack;
    }
    async emit2RoomWithAckAndRetry(to, event, data) {
        let ack = { error: true, data: [] };
        let retryAttempts = 1;
        let waitTime = 2000;
        let resend = false;
        let res;
        let successSockets = [];
        const receptorsScokets = new Set(this.io.sockets.adapter.rooms.get(to));
        if (!receptorsScokets)
            return ack;
        try {
            res = await this.io.to(to).timeout(waitTime).emitWithAck(event, data);
        }
        catch (error) {
            let knownError = error;
            res = knownError.responses;
            res.forEach((el) => {
                successSockets.push(this.socketStorage.getSocketID(el.userID));
            });
            resend = true;
        }
        res.forEach((el) => {
            ack.data.push(el.data);
        });
        //manejar un reenvio por socket
        if (resend) {
            //obbtener sockets con error
            let failedSocktes = [...this.getFailedSockets(successSockets, receptorsScokets)];
            const promise = failedSocktes.map(async (socket) => {
                let res;
                try {
                    res = await this.io.to(socket).timeout(2000).emitWithAck(event, data);
                }
                catch (error) {
                    //nothing
                }
                finally {
                    res.forEach((el) => {
                        ack.data.push(...el.data);
                    });
                }
            });
            await Promise.all(promise);
        }
        if (ack.data.length > 0)
            ack.error = false;
        return ack;
    }
    getIOServer() {
        return this.io;
    }
    getFailedSockets(successSockets, allSockets) {
        successSockets.forEach(socket => allSockets.delete(socket));
        return allSockets;
    }
}
export { SocketIOEmitter };
