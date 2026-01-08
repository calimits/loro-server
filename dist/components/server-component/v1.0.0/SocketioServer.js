import { Server as ServerIo } from "socket.io";
import { chatDB } from "../../database-component/v1.0.0/ChatMongoDBModelInstance.js";
class SocketioServer {
    io;
    socketStorage;
    constructor(socketStorage) {
        this.io = null;
        this.socketStorage = socketStorage;
    }
    getServer() {
        if (this.io === null)
            throw new Error("No Server running");
        return this.io;
    }
    initialize(server) {
        this.io = new ServerIo(server, { cors: {
                origin: "*", //cambiar para produccion,
                methods: ["GET", "POST", "PUT", "DELETE"],
                credentials: true
            } });
        this.setUpSocketListeners();
    }
    setUpSocketListeners() {
        if (this.io === null)
            throw new Error("No server instance");
        this.io.on('connection', (socket) => {
            socket.on("info", async (info) => {
                this.socketStorage.setScoket(socket.id, info.id);
                const groupIDs = await chatDB.readAllGropuIDsForOneUser(info.id);
                if (groupIDs.length > 0)
                    socket.join(groupIDs);
            });
            socket.on("disconnect", () => {
                this.socketStorage.deleteSocket(socket.id);
            });
        });
        //llamar los eventos aqui
        return this;
    }
}
export { SocketioServer };
