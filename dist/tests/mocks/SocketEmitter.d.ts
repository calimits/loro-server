import { ack, iSocketEmmiter } from "../../components/service-component/v1.0.0/socket-interface/iSocketEmitter.js";
declare class SocketEmitter implements iSocketEmmiter {
    emit21SocketWithAckAndRetry(to: string, event: string, data: object): Promise<ack>;
    emit2RoomWithAckAndRetry(to: string, event: string, data: object): Promise<ack>;
    broadcastWithAckAndRetry(to: string, event: string, data: object): Promise<ack>;
}
export { SocketEmitter };
