import { DBError } from "../../error-component/v1.0.0/DBError.js";
import { asyncSessionStorage } from "./MongoTransactionManager.js";
class MessageMongoDBModel {
    messageModel;
    withOptionalSession(options = {}) {
        const session = asyncSessionStorage.getStore();
        if (!session)
            return { ...options };
        return {
            ...options,
            ...(session && { session })
        };
    }
    constructor(messageModel) {
        this.messageModel = messageModel;
    }
    //Create
    async createMessage(message) {
        try {
            let messageSave = await this.messageModel.create([message], this.withOptionalSession({}));
            return messageSave[0];
        }
        catch (error) {
            let knownError = error;
            throw new DBError(knownError.message);
        }
    }
    async createManyMessages(messages) {
        try {
            let createdMessages;
            createdMessages = await this.messageModel.create(messages, this.withOptionalSession({ ordered: true }));
            return createdMessages;
        }
        catch (error) {
            let knownError = error;
            throw new DBError(knownError.message);
        }
    }
    //Read
    async readOneMessageByID(messageID) {
        try {
            let message = await this.messageModel.findById(messageID);
            if (message === null)
                throw new DBError("Message doesn't exist.");
            return message;
        }
        catch (error) {
            let knownError = error;
            throw new DBError(knownError.message);
        }
    }
    async readManyMessagesByID(messageIDs) {
        try {
            let messages = await this.messageModel.find({ _id: { $in: messageIDs } });
            return messages;
        }
        catch (error) {
            let knownError = error;
            throw new DBError(knownError.message);
        }
    }
    async readChatMessagesSendedAndRecievedOrderedByDateForOneUser(chatID, userID, start = 0, limit = 50) {
        try {
            let messages;
            messages = await this.messageModel.find({
                $or: [
                    { chat_id: chatID, emisorUserID: userID },
                    { chat_id: chatID, 'messageVerificationStatus.receptorUserID': userID, 'messageVerificationStatus.isRecieved': true }
                ]
            })
                .select("-__v")
                .sort({ dateTime: -1 })
                .skip(start)
                .limit(limit);
            return messages;
        }
        catch (error) {
            let knownError = error;
            throw new DBError(knownError.message);
        }
    }
    async readUnrecievedMessagesForOneChatForOneUser(chatID, userID, start = 0, limit = 50) {
        try {
            let messages;
            messages = await this.messageModel.find({
                chat_id: chatID,
                'messageVerificationStatus.receptorUserID': userID,
                'messageVerificationStatus.isRecieved': false
            })
                .select("-__v")
                .sort({ dateTime: 1 })
                .skip(start)
                .limit(limit);
            return messages;
        }
        catch (error) {
            let knownError = error;
            throw new DBError(knownError.message);
        }
    }
    async readAllUnrecievedMessagesForOneUser(userID, start = 0, limit = 300) {
        try {
            let messages;
            messages = await this.messageModel.find({
                'messageVerificationStatus.receptorUserID': userID,
                'messageVerificationStatus.isRecieved': false
            })
                .select("-__v")
                .sort({ dateTime: 1 })
                .skip(start)
                .limit(limit);
            return messages;
        }
        catch (error) {
            let knownError = error;
            throw new DBError(knownError.message);
        }
    }
    async readQuantityOfUnrecievedMessagesForOneChatForOneUser(chatID, userID) {
        try {
            let numberOfMessages;
            numberOfMessages = await this.messageModel.countDocuments({
                chat_id: chatID,
                'messageVerificationStatus.receptorUserID': userID,
                'messageVerificationStatus.isRecieved': false
            });
            return numberOfMessages;
        }
        catch (error) {
            let knownError = error;
            throw new DBError(knownError.message);
        }
    }
    async readMessageStatusVerificationForOneUser(messageID, userID) {
        try {
            let messageStatus;
            let res = await this.messageModel.findOne({ _id: messageID, 'messageVerificationStatus.receptorUserID': userID }, { _id: 1, 'messageVerificationStatus.$': 1 });
            if (res === null)
                throw new Error("Message not found.");
            messageStatus = {
                _id: res._id,
                status: res.messageVerificationStatus[0]
            };
            return messageStatus;
        }
        catch (error) {
            let knownError = error;
            throw new DBError(knownError.message);
        }
    }
    async readManyMessagesStatusVerificationForOneUser(messageIDs, userID) {
        try {
            let messagesStatus = [];
            let res = await this.messageModel.find({ _id: { $in: messageIDs }, 'messageVerificationStatus.receptorUserID': userID }, { _id: 1, messageVerificationStatus: { $elemMatch: { receptorUserID: userID } } });
            if (res === null)
                throw new Error("Message not found.");
            res.forEach(messageStatus => {
                messagesStatus.push({ _id: messageStatus._id, status: messageStatus.messageVerificationStatus[0] });
            });
            return messagesStatus;
        }
        catch (error) {
            let knownError = error;
            throw new DBError(knownError.message);
        }
    }
    //Update
    async updateOneTextMessage(id, textContent) {
        try {
            await this.messageModel.findOneAndUpdate({ _id: id, type: "text" }, { content: textContent }, this.withOptionalSession({}));
        }
        catch (error) {
            let knownError = error;
            throw new DBError(knownError.message);
        }
    }
    async updateMessageIsRecievedVerificationForOneUser(messageID, userID, isRecieved) {
        try {
            await this.messageModel.findOneAndUpdate({ _id: messageID, 'messageVerificationStatus.receptorUserID': userID }, { $set: { 'messageVerificationStatus.$.isRecieved': isRecieved } }, this.withOptionalSession({}));
        }
        catch (error) {
            let knownError = error;
            throw new DBError(knownError.message);
        }
    }
    async updateMessageIsRecievedVerificationForManyUsers(messageID, userIDs, isRecieved) {
        try {
            await this.messageModel.updateMany({ _id: messageID }, { $set: { 'messageVerificationStatus.$[elem].isRecieved': isRecieved } }, this.withOptionalSession({ arrayFilters: [{ 'elem.receptorUserID': { $in: userIDs } }] }));
        }
        catch (error) {
            let knownError = error;
            throw new DBError(knownError.message);
        }
    }
    async updateManyMessageIsRecievedVerificationForOneUser(messageIDs, userID, isRecieved) {
        try {
            await this.messageModel.updateMany({ _id: { $in: messageIDs }, 'messageVerificationStatus.receptorUserID': userID }, { $set: { 'messageVerificationStatus.$.isRecieved': isRecieved } }, this.withOptionalSession({}));
        }
        catch (error) {
            let knownError = error;
            throw new DBError(knownError.message);
        }
    }
    async updateManyMessagesIsRecievedVerificationForManyUsers(messageIDs, userIDs, isRecieved) {
        try {
            await this.messageModel.updateMany({
                _id: { $in: messageIDs },
                'messageVerificationStatus.receptorUserID': { $in: userIDs }
            }, {
                $set: { 'messageVerificationStatus.$.isRecieved': isRecieved }
            }, this.withOptionalSession({}));
        }
        catch (error) {
            const knownError = error;
            throw new DBError(knownError.message);
        }
    }
    async updateMessageIsReadVerificationForOneUser(messageID, userID, isRead) {
        try {
            await this.messageModel.findOneAndUpdate({ _id: messageID, 'messageVerificationStatus.receptorUserID': userID }, { $set: { 'messageVerificationStatus.$.isRead': isRead } }, this.withOptionalSession({}));
        }
        catch (error) {
            let knownError = error;
            throw new DBError(knownError.message);
        }
    }
    async updateManyMessageIsReadVerificationForOneUser(messageIDs, userID, isRead) {
        try {
            await this.messageModel.updateMany({ _id: { $in: messageIDs }, 'messageVerificationStatus.receptorUserID': userID }, { $set: { 'messageVerificationStatus.$.isRead': isRead } }, this.withOptionalSession({}));
        }
        catch (error) {
            let knownError = error;
            throw new DBError(knownError.message);
        }
    }
    //Delete
    async deleteOneMessageForOneChatForOneUser(id, userID) {
        try {
            await this.messageModel.findOneAndDelete({ _id: id, emisorUserID: userID }, this.withOptionalSession({}));
        }
        catch (error) {
            let knownError = error;
            throw new DBError(knownError.message);
        }
    }
    async deleteManyMessagesForOneChatForOneUser(ids, userID) {
        try {
            await this.messageModel.deleteMany({ _id: { $in: ids }, emisorUserID: userID }, this.withOptionalSession({}));
        }
        catch (error) {
            let knownError = error;
            throw new DBError(knownError.message);
        }
    }
}
export { MessageMongoDBModel };
