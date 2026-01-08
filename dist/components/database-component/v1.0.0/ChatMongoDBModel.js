import { DBError } from "../../error-component/v1.0.0/DBError.js";
import { asyncSessionStorage } from "./MongoTransactionManager.js";
class ChatMongoDBModel {
    chatModel;
    withOptionalSession(options = {}) {
        const session = asyncSessionStorage.getStore();
        if (!session)
            return { ...options };
        return {
            ...options,
            ...(session && { session })
        };
    }
    constructor(chatModel) {
        this.chatModel = chatModel;
    }
    //Create
    async createChat(chat) {
        try {
            let savedChat = await this.chatModel.create([chat], this.withOptionalSession({}));
            if (savedChat === null)
                throw new DBError("Chat doesn't exist.");
            return savedChat[0];
        }
        catch (error) {
            let knownError = error;
            throw new DBError(knownError.message);
        }
    }
    async createMemberForOneChat(chatID, member) {
        try {
            await this.chatModel.findByIdAndUpdate(chatID, { $addToSet: { chatUsers: member } }, this.withOptionalSession({}));
        }
        catch (error) {
            let knownError = error;
            throw new DBError(knownError.message);
        }
    }
    //Read
    async readAllChatsForOneUser(userID, start = 0, limit = 50) {
        try {
            let chats;
            chats = await this.chatModel.find({ 'chatUsers.userID': userID })
                .select("-__v")
                .sort({ lastUpdated: -1 })
                .skip(start)
                .limit(limit);
            return chats;
        }
        catch (error) {
            let knownError = error;
            throw new DBError(knownError.message);
        }
    }
    async readAllGropuIDsForOneUser(userID) {
        try {
            let chats;
            let groupIDs = [];
            chats = await this.chatModel.find({ 'chatUsers.userID': userID });
            chats.forEach(chat => {
                if (chat.chatUsers.length > 2)
                    groupIDs.push(String(chat._id));
            });
            return groupIDs;
        }
        catch (error) {
            let knownError = error;
            throw new DBError(knownError.message);
        }
    }
    async readQuantityOfChatsForOneUser(userID) {
        try {
            let numberOfChats = await this.chatModel.countDocuments({ 'chatUsers.userID': userID });
            return numberOfChats;
        }
        catch (error) {
            let knownError = error;
            throw new DBError(knownError.message);
        }
    }
    async readManyUnArchivedChatsForOneUser(userID, start, limit) {
        try {
            let chats;
            chats = await this.chatModel.find({
                'chatUsers': {
                    $elemMatch: {
                        userID: userID,
                        hasArchivedThisChat: false
                    }
                }
            })
                .select("-__v")
                .sort({ lastUpdated: -1 })
                .skip(start)
                .limit(limit);
            return chats;
        }
        catch (error) {
            let knownError = error;
            throw new DBError(knownError.message);
        }
    }
    async readManyArchivedChatsForOneUser(userID, start = 0, limit = 50) {
        try {
            let chats;
            chats = await this.chatModel.find({
                'chatUsers': {
                    $elemMatch: {
                        userID: userID,
                        hasArchivedThisChat: true
                    }
                }
            })
                .select("-__v")
                .sort({ lastUpdated: -1 })
                .skip(start)
                .limit(limit);
            return chats;
        }
        catch (error) {
            let knownError = error;
            throw new DBError(knownError.message);
        }
    }
    async readQuantityOfArchivedChatsForOneUser(userID) {
        try {
            let numberOfChats = await this.chatModel.countDocuments({
                'chatUsers': {
                    $elemMatch: {
                        userID: userID,
                        hasArchivedThisChat: true
                    }
                }
            });
            return numberOfChats;
        }
        catch (error) {
            let knownError = error;
            throw new DBError(knownError.message);
        }
    }
    async readAllChatMembers(chatID) {
        try {
            let chatMembers = [];
            let chat = await this.chatModel.findById(chatID, {
                'chatUsers.userID': true,
                'chatUsers.isAdmin': true, _id: false
            });
            chatMembers = chat.chatUsers;
            return chatMembers;
        }
        catch (error) {
            let knownError = error;
            throw new DBError(knownError.message);
        }
    }
    //Update
    async updateChatInfo(chatID, info) {
        try {
            await this.chatModel.findByIdAndUpdate(chatID, { name: info.name, description: info.description }, this.withOptionalSession({}));
        }
        catch (error) {
            let knownError = error;
            throw new DBError(knownError.message);
        }
    }
    async updateChatName(chatID, name) {
        try {
            await this.chatModel.findByIdAndUpdate(chatID, { name: name }, this.withOptionalSession({}));
        }
        catch (error) {
            let knownError = error;
            throw new DBError(knownError.message);
        }
    }
    async updateChatDescription(chatID, description) {
        try {
            await this.chatModel.findByIdAndUpdate(chatID, { description: description }, this.withOptionalSession({}));
        }
        catch (error) {
            let knownError = error;
            throw new DBError(knownError.message);
        }
    }
    async updateChatLastUpdatedDate(chatID, date) {
        try {
            await this.chatModel.findByIdAndUpdate(chatID, { lastUpdated: date }, this.withOptionalSession({}));
        }
        catch (error) {
            let knownError = error;
            throw new DBError(knownError.message);
        }
    }
    async updateArchivedStatusForOneChatForOneUser(chatID, userID, isArchived) {
        try {
            await this.chatModel.findOneAndUpdate({ _id: chatID, 'chatUsers.userID': userID }, { $set: { 'chatUsers.$.hasArchivedThisChat': isArchived } }, this.withOptionalSession({}));
        }
        catch (error) {
            let knownError = error;
            throw new DBError(knownError.message);
        }
    }
    async updateMemberAdminStatusForOneChat(chatID, userID, isAdmin) {
        try {
            await this.chatModel.findOneAndUpdate({ _id: chatID, 'chatUsers.userID': userID }, { $set: { 'chatUsers.$.isAdmin': isAdmin } }, this.withOptionalSession({}));
        }
        catch (error) {
            let knownError = error;
            throw new DBError(knownError.message);
        }
    }
    async updateManyMembersAdminStatusForOneChat(chatID, userIDs, isAdmin) {
        try {
            await this.chatModel.findOneAndUpdate({ _id: chatID, 'chatUsers.userID': { $in: userIDs } }, { $set: { 'chatUsers.$[elem].isAdmin': isAdmin } }, this.withOptionalSession({ arrayFilters: [{ 'elem.userID': { $in: userIDs } }], new: true }));
        }
        catch (error) {
            let knownError = error;
            throw new DBError(knownError.message);
        }
    }
    //Delete
    async deleteMemberForOneChat(chatID, userID) {
        try {
            await this.chatModel.findByIdAndUpdate(chatID, { $pull: { chatUsers: { userID: userID } } }, this.withOptionalSession({}));
        }
        catch (error) {
            let knownError = error;
            throw new DBError(knownError.message);
        }
    }
    async deleteManyMembersForOneChat(chatID, userIDs) {
        try {
            await this.chatModel.findByIdAndUpdate(chatID, { $pull: { chatUsers: { userID: { $in: userIDs } } } }, this.withOptionalSession({}));
        }
        catch (error) {
            let knownError = error;
            throw new DBError(knownError.message);
        }
    }
    async deleteOneChatForAllChatUsers(chatID) {
        try {
            await this.chatModel.findByIdAndDelete(chatID, this.withOptionalSession({}));
        }
        catch (error) {
            let knownError = error;
            throw new DBError(knownError.message);
        }
    }
}
export { ChatMongoDBModel };
