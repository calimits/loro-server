import { Chat, ChatInfo, ChatMember, ChatUser } from "../../../../types/ChatTypes.js";
interface iChatDB {
    createChat(chat: Chat): Promise<Chat>;
    createMemberForOneChat(chatID: string, member: ChatUser): Promise<void>;
    readAllChatsForOneUser(userID: string, start: number, limit: number): Promise<Chat[]>;
    readAllGropuIDsForOneUser(userID: string): Promise<string[]>;
    readQuantityOfChatsForOneUser(userID: string): Promise<number>;
    readManyUnArchivedChatsForOneUser(userID: string, start: number, limit: number): Promise<Chat[]>;
    readManyArchivedChatsForOneUser(userID: string, start: number, limit: number): Promise<Chat[]>;
    readQuantityOfArchivedChatsForOneUser(userID: string): Promise<number>;
    readAllChatMembers(chatID: string): Promise<ChatMember[]>;
    updateChatInfo(chatID: string, info: ChatInfo): Promise<void>;
    updateChatName(chatID: string, name: String): Promise<void>;
    updateChatDescription(chatID: string, description: String): Promise<void>;
    updateChatLastUpdatedDate(chatID: string, date: Date): Promise<void>;
    updateArchivedStatusForOneChatForOneUser(chatID: string, userID: string, isArchived: boolean): Promise<void>;
    updateMemberAdminStatusForOneChat(chatID: string, userID: string, isAdmin: boolean): Promise<void>;
    updateManyMembersAdminStatusForOneChat(chatID: string, userIDs: string[], isAdmin: boolean): Promise<void>;
    deleteMemberForOneChat(chatID: string, userID: string): Promise<void>;
    deleteManyMembersForOneChat(chatID: string, userIDs: string[]): Promise<void>;
    deleteOneChatForAllChatUsers(chatID: string): Promise<void>;
}
export { iChatDB };
