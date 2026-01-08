class SocketEmitter {
    emit21SocketWithAckAndRetry(to, event, data) {
        return Promise.resolve({ error: false, data: [{ receptorUserID: "calimits", isRecieved: true, isRead: false }] });
    }
    emit2RoomWithAckAndRetry(to, event, data) {
        return Promise.resolve({ error: false, data: [{ receptorUserID: "calimits", isRecieved: true, isRead: false }, { receptorUserID: "geibro", isRecieved: true, isRead: false }] });
    }
    broadcastWithAckAndRetry(to, event, data) {
        return Promise.resolve({ error: false, data: [{ id: "aljsdhlasd" }] });
    }
}
export { SocketEmitter };
