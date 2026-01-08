import { Message, MessageStatus } from "../../../../types/MessageTypes.js";
interface iMessageDB {
    createMessage(message: Message): Promise<Message>;
    createManyMessages(messages: Message[]): Promise<Message[]>;
    readOneMessageByID(messageID: string): Promise<Message>;
    readManyMessagesByID(messageIDs: string[]): Promise<Message[]>;
    readChatMessagesSendedAndRecievedOrderedByDateForOneUser(chatID: string, userID: string, start: number, limit: number): Promise<Message[]>;
    readUnrecievedMessagesForOneChatForOneUser(chatID: string, userID: string, start: number, limit: number): Promise<Message[]>;
    readAllUnrecievedMessagesForOneUser(userID: string, start: number, limit: number): Promise<Message[]>;
    readQuantityOfUnrecievedMessagesForOneChatForOneUser(chatID: string, userID: string): Promise<number>;
    readMessageStatusVerificationForOneUser(messageID: string, userID: string): Promise<MessageStatus>;
    readManyMessagesStatusVerificationForOneUser(messageIDs: string[], userID: string): Promise<MessageStatus[]>;
    updateOneTextMessage(id: string, textContent: string): Promise<void>;
    updateMessageIsRecievedVerificationForOneUser(messageID: string, userID: string, isRecieved: boolean): Promise<void>;
    updateMessageIsRecievedVerificationForManyUsers(messageID: string, userIDs: string[], isRecieved: boolean): Promise<void>;
    updateManyMessageIsRecievedVerificationForOneUser(messageIDs: string[], userID: string, isRecieved: boolean): Promise<void>;
    updateManyMessagesIsRecievedVerificationForManyUsers(messageIDs: string[], userIDs: string[], isRecieved: boolean): Promise<void>;
    updateMessageIsReadVerificationForOneUser(messageID: string, userID: string, isRead: boolean): Promise<void>;
    updateManyMessageIsReadVerificationForOneUser(messageIDs: string[], userID: string, isRead: boolean): Promise<void>;
    deleteOneMessageForOneChatForOneUser(id: string, userID: string): Promise<void>;
    deleteManyMessagesForOneChatForOneUser(ids: string[], userID: string): Promise<void>;
}
export { iMessageDB };
