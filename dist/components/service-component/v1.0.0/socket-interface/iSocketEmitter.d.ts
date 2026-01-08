import { Server } from "socket.io";
type ack = {
    userID?: string;
    error: boolean;
    data: object[];
};
interface iSocketEmmiter {
    emit21SocketWithAckAndRetry(to: string, event: string, data: object): Promise<ack>;
    emit2RoomWithAckAndRetry(to: string, event: string, data: object): Promise<ack>;
    broadcastWithAckAndRetry(to: string, event: string, data: object): Promise<ack>;
    getIOServer(): Server;
}
export { iSocketEmmiter, ack };
