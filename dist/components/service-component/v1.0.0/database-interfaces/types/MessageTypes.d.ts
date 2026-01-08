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
interface MessageBody {
    id: number;
    chat_id: string;
    type: "audio" | "photo" | "text" | "video" | "document";
    content: string | File;
    emisorUserID: string;
    dateTime: Date;
}
export { Message, StatusVerification, MessageStatus, MessageBody };
