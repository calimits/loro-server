import { File } from "./FileType.js";
type StatusVerification = {
    receptorUserID: string;
    isRecieved: boolean;
    isRead: boolean;
};
interface Message {
    _id?: string;
    type: "audio" | "photo" | "text" | "video" | "document";
    content: string;
    chat_id: string;
    emisorUserID: string;
    messageVerificationStatus: StatusVerification[];
    dateTime: Date;
}
interface MessageStatus {
    status: StatusVerification;
    _id: string;
}
type messageType = "audio" | "photo" | "text" | "video" | "document";
interface MessageBody {
    id?: number;
    chat_id: string;
    type: messageType;
    content: string | File;
    emisorUserID: string;
    dateTime: Date;
}
interface MsgJSON {
    id?: number;
    chat_id: string;
    type: messageType;
    content: string;
    emisorUserID: string;
    dateTime: string;
}
interface MsgInfo extends Pick<MsgJSON, "id" | "chat_id" | "type" | "emisorUserID" | "dateTime"> {
}
export { Message, StatusVerification, MessageStatus, MessageBody, messageType, MsgInfo, MsgJSON };
