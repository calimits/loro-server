import { iChatDB } from "./database-interfaces/iChatDB.js";
import { Chat, ChatMember } from "../../../types/ChatTypes.js";
import { iSocketEmmiter } from "./socket-interface/iSocketEmitter.js";
import { iSocketStorage } from "./socket-interface/iSocketStorage.js";
declare class ChatService {
    private chatDB;
    private socketEmitter;
    private socketStorage;
    constructor(chatDB: iChatDB, socketEmitter: iSocketEmmiter, socketStorage: iSocketStorage);
    getAllChatsForOneUser(userID: string, start?: number, limit?: number): Promise<Chat[]>;
    getAllArchivedChatsForOneUser(userID: string, start?: number, limit?: number): Promise<Chat[]>;
    getAllUnarchivedChatsForOneUser(userID: string, start?: number, limit?: number): Promise<Chat[]>;
    getAmountOfUnArchivedChatsForOneUser(userID: string): Promise<number>;
    getAllChatMembers(chatID: string): Promise<ChatMember[]>;
    createChat(chat: Chat, userID: string): Promise<string>;
    addMember2Chat(chatID: string, userID: string, newMemberID: string): Promise<void>;
    updateChatInfo(chatID: string, userID: string, chatInfo: {
        name: string;
        description: string;
    }): Promise<void>;
    updateChatName(chatID: string, userID: string, name: string): Promise<void>;
    updateChatDescription(chatID: string, userID: string, description: string): Promise<void>;
    updateMemberAdminStatusFrom1CHat(chatID: string, userID: string, memberID: string, isAdminB: boolean): Promise<void>;
    updateManyMemberAdminStatusFrom1Chat(chatID: string, userID: string, memberIDs: string[], isAdminB: boolean): Promise<void>;
    updateMemberArchivedStatusFrom1Chat(chatID: string, memberID: string, isArchived: boolean): Promise<void>;
    deleteMemberFromChat(chatID: string, memberID: string, userID: string): Promise<void>;
    deleteManyMembersFromChat(chatID: string, memberIDs: string[], userID: string): Promise<void>;
    private notifyMembers;
    private joinSockets2Room;
    private validateIfUserIsAdminOfGroup;
}
export { ChatService };
