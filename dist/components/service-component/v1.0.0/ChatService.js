import { EVENT_ON_CHAT_CREATION, EVENT_ON_CHAT_UPDATE, EVENT_ON_DELETE_MEMBER, EVENT_ON_MEMBER_ADDITION, EVENT_ON_MEMBER_UPDATE } from "../../../constants/socket-events-names.js";
import { ValidationError } from "../../error-component/v1.0.0/ValidationError.js";
class ChatService {
    chatDB;
    socketEmitter;
    socketStorage;
    constructor(chatDB, socketEmitter, socketStorage) {
        this.chatDB = chatDB;
        this.socketEmitter = socketEmitter;
        this.socketStorage = socketStorage;
    }
    async getAllChatsForOneUser(userID, start = 0, limit = 50) {
        try {
            let chats;
            chats = await this.chatDB.readAllChatsForOneUser(userID, start, limit);
            return chats;
        }
        catch (error) {
            throw error;
        }
    }
    async getAllArchivedChatsForOneUser(userID, start = 0, limit = 50) {
        try {
            let chats;
            chats = await this.chatDB.readManyArchivedChatsForOneUser(userID, start, limit);
            return chats;
        }
        catch (error) {
            throw error;
        }
    }
    async getAllUnarchivedChatsForOneUser(userID, start = 0, limit = 50) {
        try {
            let chats;
            chats = await this.chatDB.readManyUnArchivedChatsForOneUser(userID, start, limit);
            return chats;
        }
        catch (error) {
            throw error;
        }
    }
    async getAmountOfUnArchivedChatsForOneUser(userID) {
        try {
            let numberOfChats;
            numberOfChats = await this.chatDB.readQuantityOfChatsForOneUser(userID);
            return numberOfChats;
        }
        catch (error) {
            throw error;
        }
    }
    async getAllChatMembers(chatID) {
        try {
            let chatMembers;
            chatMembers = await this.chatDB.readAllChatMembers(chatID);
            return chatMembers;
        }
        catch (error) {
            throw error;
        }
    }
    async createChat(chat, userID) {
        try {
            //save chat in DB
            let savedChat = await this.chatDB.createChat(chat);
            let members = [];
            savedChat.chatUsers.forEach(user => members.push(user.userID));
            let members2Notify = members.filter(member => member !== userID);
            //joining connected sockets to group room
            if (members.length > 1)
                this.joinSockets2Room(members, savedChat._id);
            //notify members about chat creation
            let ack = await this.notifyMembers(members2Notify, String(savedChat._id), EVENT_ON_CHAT_CREATION, savedChat);
            return savedChat._id;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async addMember2Chat(chatID, userID, newMemberID) {
        try {
            //validate if user is admin of group
            let { isAdmin } = await this.validateIfUserIsAdminOfGroup(chatID, userID);
            if (!isAdmin)
                throw new ValidationError("User is not admin");
            //add member to group
            let newMember = { isAdmin: false, userID: newMemberID, hasArchivedThisChat: false };
            await this.chatDB.createMemberForOneChat(chatID, newMember);
            //notify member
            let ack = await this.notifyMembers([newMemberID], chatID, EVENT_ON_MEMBER_ADDITION, newMember);
        }
        catch (error) {
            throw error;
        }
    }
    async updateChatInfo(chatID, userID, chatInfo) {
        try {
            //validate if user is admin of group
            let { isAdmin, memberIds } = await this.validateIfUserIsAdminOfGroup(chatID, userID);
            if (!isAdmin)
                throw new ValidationError("User is not admin.");
            //update chat info in DB
            await this.chatDB.updateChatInfo(chatID, chatInfo);
            //notify members about updating
            memberIds.some(member => member !== userID);
            let ack = await this.notifyMembers(memberIds, chatID, EVENT_ON_CHAT_UPDATE, { chatID, chatInfo });
        }
        catch (error) {
            throw error;
        }
    }
    async updateChatName(chatID, userID, name) {
        try {
            //validate if user is admin of group
            let { isAdmin, memberIds } = await this.validateIfUserIsAdminOfGroup(chatID, userID);
            if (!isAdmin)
                throw new ValidationError("User is not admin.");
            //update chat info in DB
            await this.chatDB.updateChatName(chatID, name);
            //notify members about updating
            memberIds.some(member => member !== userID);
            let ack = await this.notifyMembers(memberIds, chatID, EVENT_ON_CHAT_UPDATE, { name, chatID });
        }
        catch (error) {
            throw error;
        }
    }
    async updateChatDescription(chatID, userID, description) {
        try {
            //validate if user is admin of group
            let { isAdmin, memberIds } = await this.validateIfUserIsAdminOfGroup(chatID, userID);
            if (!isAdmin)
                throw new ValidationError("User is not admin.");
            //update chat info in DB
            await this.chatDB.updateChatDescription(chatID, description);
            //notify members about updating
            memberIds.some(member => member !== userID);
            let ack = await this.notifyMembers(memberIds, chatID, EVENT_ON_CHAT_UPDATE, { description, chatID });
        }
        catch (error) {
            throw error;
        }
    }
    async updateMemberAdminStatusFrom1CHat(chatID, userID, memberID, isAdminB) {
        try {
            //validate if user is admin of group
            let { isAdmin } = await this.validateIfUserIsAdminOfGroup(chatID, userID);
            if (!isAdmin)
                throw new ValidationError("User is not admin.");
            //update admin status for member in DB
            await this.chatDB.updateMemberAdminStatusForOneChat(chatID, memberID, isAdminB);
            //notify member
            let ack = await this.notifyMembers([memberID], chatID, EVENT_ON_MEMBER_UPDATE, { memberID, isAdmin, chatID });
        }
        catch (error) {
            throw error;
        }
    }
    async updateManyMemberAdminStatusFrom1Chat(chatID, userID, memberIDs, isAdminB) {
        try {
            //validate if user is admin of group
            let { isAdmin } = await this.validateIfUserIsAdminOfGroup(chatID, userID);
            if (!isAdmin)
                throw new ValidationError("User is not admin.");
            //update admin status for member in DB
            await this.chatDB.updateManyMembersAdminStatusForOneChat(chatID, memberIDs, isAdminB);
            //notify members
            let ack = await this.notifyMembers(memberIDs, chatID, EVENT_ON_MEMBER_UPDATE, { memberIDs, isAdmin, chatID });
        }
        catch (error) {
            throw error;
        }
    }
    async updateMemberArchivedStatusFrom1Chat(chatID, memberID, isArchived) {
        try {
            //update admin status for member in DB
            await this.chatDB.updateArchivedStatusForOneChatForOneUser(chatID, memberID, isArchived);
        }
        catch (error) {
            throw error;
        }
    }
    async deleteMemberFromChat(chatID, memberID, userID) {
        try {
            //validate if user is same as member to delete
            let canDeleteMember = memberID === userID;
            if (!canDeleteMember) {
                //validate if user is admin of group
                let { isAdmin } = await this.validateIfUserIsAdminOfGroup(chatID, userID);
                if (!isAdmin)
                    throw new ValidationError("User is not admin.");
            }
            //delete member from chat in DB
            await this.chatDB.deleteMemberForOneChat(chatID, memberID);
            //notify member
            let ack = await this.notifyMembers([memberID], chatID, EVENT_ON_DELETE_MEMBER, { memberID, chatID });
        }
        catch (error) {
        }
    }
    async deleteManyMembersFromChat(chatID, memberIDs, userID) {
        try {
            //validate if user is admin of group
            let { isAdmin } = await this.validateIfUserIsAdminOfGroup(chatID, userID);
            if (!isAdmin)
                throw new ValidationError("User is not admin.");
            //delete member from chat in DB
            await this.chatDB.deleteManyMembersForOneChat(chatID, memberIDs);
            //notify member
            let ack = await this.notifyMembers(memberIDs, chatID, EVENT_ON_DELETE_MEMBER, { memberIDs, chatID });
        }
        catch (error) {
        }
    }
    /*public async addManyMembers2Chat(chatID: string, userID: string, newMemberIDs: string[]): Promise<void> {
        try {
            //validate if user is admin of group
            let isAdmin: boolean = await this.validateIfUserIsAdminOfGroup(chatID, userID);
            if (!isAdmin) throw new ValidationError("User is not admin");

            //add member to group
            let newMembers: ChatUser[];
        } catch (error) {
            throw error;
        }
    }
    */
    //utility functions
    async notifyMembers(members, chatID, event, data) {
        let ack = { error: false, data: [{}] };
        if (members.length > 1)
            ack = await this.socketEmitter.emit2RoomWithAckAndRetry(chatID, event, data);
        if (members.length === 1)
            ack = await this.socketEmitter.emit21SocketWithAckAndRetry(members[0], event, data);
        return ack;
    }
    joinSockets2Room(members, chatID) {
        members.forEach(member => {
            const socketID = this.socketStorage.getSocketID(member);
            const io = this.socketEmitter.getIOServer();
            const socket = io.sockets.sockets.get(socketID);
            if (socket) {
                socket.join(String(chatID));
            }
        });
    }
    async validateIfUserIsAdminOfGroup(chatID, userID) {
        let members = await this.chatDB.readAllChatMembers(chatID);
        let user = { userID: "", isAdmin: false };
        let isAdmin = true;
        let memberIds = [];
        members.forEach(member => {
            if (member.userID === userID)
                user = member;
            memberIds.push(member.userID);
        });
        isAdmin = user.isAdmin === isAdmin;
        return { isAdmin, memberIds };
    }
}
export { ChatService };
