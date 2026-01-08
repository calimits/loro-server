import { STORAGE_ROOT } from "../../../constants/default.js";
import { EVENT_ON_MESSAGE, EVENT_ON_MESSAGE_DELETE, EVENT_ON_MESSAGE_STATUS, EVENT_ON_MESSAGE_UPDATE } from "../../../constants/socket-events-names.js";
import { ValidationError } from "../../error-component/v1.0.0/ValidationError.js";
class MessageService {
    messageDB;
    chatDB;
    storage;
    transactionManager;
    socketEmiter;
    constructor(messageDB, chatDB, storage, transactionManager, socketEmiter) {
        this.messageDB = messageDB;
        this.chatDB = chatDB;
        this.storage = storage;
        this.transactionManager = transactionManager;
        this.socketEmiter = socketEmiter;
    }
    async getChatMessagesForOneUser(chatID, userID, start, limit) {
        try {
            const messages = await this.messageDB.readChatMessagesSendedAndRecievedOrderedByDateForOneUser(chatID, userID, start, limit);
            return messages;
        }
        catch (error) {
            throw error;
        }
    }
    async getUnrecievedChatMessagesForOneUser(chatID, userID, start, limit) {
        try {
            const messages = await this.messageDB.readUnrecievedMessagesForOneChatForOneUser(chatID, userID, start, limit);
            return messages;
        }
        catch (error) {
            throw error;
        }
    }
    async getAllUnrecievedMessageForOneUser(userID, start = 0, limit = 300) {
        try {
            const messages = await this.messageDB.readAllUnrecievedMessagesForOneUser(userID, start, limit);
            return messages;
        }
        catch (error) {
            throw error;
        }
    }
    async getNumberOfUnrecievedMessagesForManyChatsForOneUser(chatIDs, userID) {
        try {
            let chatMap = new Map();
            ;
            chatIDs.forEach(async (id) => {
                let numberOfMessages = await this.messageDB.readQuantityOfUnrecievedMessagesForOneChatForOneUser(id, userID);
                chatMap.set(id, numberOfMessages);
            });
            return chatMap;
        }
        catch (error) {
            throw error;
        }
    }
    async getMessageStatusVerificationForOneUser(messageID, userID) {
        try {
            let messageStatus = await this.messageDB.readMessageStatusVerificationForOneUser(messageID, userID);
            return messageStatus;
        }
        catch (error) {
            throw error;
        }
    }
    async getManyMessageStatusVerificationForOneUser(messageIDs, userID) {
        try {
            let messagesStatus = await this.messageDB.readManyMessagesStatusVerificationForOneUser(messageIDs, userID);
            return messagesStatus;
        }
        catch (error) {
            throw error;
        }
    }
    async sendMessage(message) {
        try {
            //validating if user can send message to chat
            let { canSendMessage, chatMembers } = await this.validateIfUserCanSendMessageToThisChat(message.chat_id, message.emisorUserID);
            if (!canSendMessage)
                throw new ValidationError("User can't send message to this group");
            //creating message verifications
            let { receptors, messageStatusVerifications } = this.buildMessageVerifications(message.emisorUserID, chatMembers);
            //uploading file
            let fileURL = await this.uploadFileIfMessageTypeIsFile(message.content, message.type);
            //saving message in DB
            let messageContent = typeof message.content === "string" ? message.content : fileURL;
            let messageForDB = { messageVerificationStatus: messageStatusVerifications, chat_id: message.chat_id,
                emisorUserID: message.emisorUserID, content: messageContent, type: message.type, dateTime: message.dateTime };
            messageForDB = await this.saveMessageInDBBeforeSending(messageForDB, message.chat_id);
            //sending messages to receptors via sockets
            let ack = await this.notifyReceptors(receptors, message.chat_id, messageForDB, EVENT_ON_MESSAGE);
            if (ack.error)
                return messageForDB._id;
            //saving verification in DB
            await this.updateMessageRecievedVerificationinDB(ack, messageForDB._id);
            //updating message status for message emisor
            await this.socketEmiter.emit21SocketWithAckAndRetry(message.emisorUserID, EVENT_ON_MESSAGE_STATUS, { receptores: [...ack.data], msgID: messageForDB._id, chatID: messageForDB.chat_id });
            return messageForDB._id;
        }
        catch (error) {
            throw error;
        }
    }
    async sendManyMessagesToOneChat(messages) {
        try {
            //VALIDATIONS
            let allMessagesHaveSameChatAndEmisorID = this.validateIfAllMessageHaveSameChatIDAndEmisorID(messages);
            if (!allMessagesHaveSameChatAndEmisorID)
                throw new ValidationError("Messages validation error.");
            let { canSendMessage, chatMembers } = await this.validateIfUserCanSendMessageToThisChat(messages[0].chat_id, messages[0].emisorUserID);
            if (!canSendMessage)
                throw new ValidationError("User can't send message to this group");
            //building message verifications
            let { receptors, messageStatusVerifications } = this.buildMessageVerifications(messages[0].emisorUserID, chatMembers);
            //processing messages, uploading files before saving in DB and return list of ready and failed messages to send
            let { readyMessages, failedMessages } = await this.processMessagesToSend(messages);
            //saving messages in DB before notifying receptors
            let messagesForDB = [];
            readyMessages.forEach(message => {
                messagesForDB.push({ messageVerificationStatus: messageStatusVerifications, chat_id: message.chat_id,
                    emisorUserID: message.emisorUserID, content: message.content,
                    type: message.type, dateTime: message.dateTime });
            });
            let savedMessages = [];
            await this.transactionManager.executeTransaction(async () => {
                savedMessages = await this.messageDB.createManyMessages(messagesForDB);
                await this.chatDB.updateChatLastUpdatedDate(messagesForDB[0].chat_id, new Date());
            });
            const msgIDs = [];
            savedMessages.forEach(msg => {
                msgIDs.push(msg._id);
            });
            //sending messages to receptors via sockets
            let ack = await this.notifyReceptors(receptors, messages[0].chat_id, savedMessages, EVENT_ON_MESSAGE);
            if (ack.error)
                return { failedMsg: failedMessages, msgIDs: msgIDs };
            await this.updateManyMessageRecievedVerificationinDB(ack, msgIDs);
            //updating message status for message emisor
            await this.socketEmiter.emit21SocketWithAckAndRetry(messages[0].emisorUserID, EVENT_ON_MESSAGE_STATUS, { receptores: [...ack.data], msgIDs: msgIDs, chatID: savedMessages[0].chat_id });
            return { failedMsg: failedMessages, msgIDs: msgIDs };
        }
        catch (error) {
            throw error;
        }
    }
    async updateOneTextMessage(messageID, userID, content) {
        try {
            //validate if user can edit message
            let { canEditMessage, message } = await this.validateIfUserCanEditMessage(messageID, userID);
            if (!canEditMessage)
                throw new ValidationError("User can't edit this message.");
            //update message in DB
            await this.messageDB.updateOneTextMessage(messageID, content);
            //notify updated message to receptors
            let receptors = [];
            message.messageVerificationStatus.forEach(status => receptors.push({ userID: status.receptorUserID, isAdmin: false }));
            let ack = await this.notifyReceptors(receptors, message.chat_id, message, EVENT_ON_MESSAGE_UPDATE);
        }
        catch (error) {
            throw error;
        }
    }
    async updateManyMessagesRecievedStatusForOneUser(messageIDs, userID, isRecieved) {
        try {
            await this.messageDB.updateManyMessageIsRecievedVerificationForOneUser(messageIDs, userID, isRecieved);
        }
        catch (error) {
            throw error;
        }
    }
    async updateManyMessagesReadStatusForOneUser(messageIDs, userID, isRead) {
        try {
            await this.messageDB.updateManyMessageIsReadVerificationForOneUser(messageIDs, userID, isRead);
        }
        catch (error) {
            throw error;
        }
    }
    async deleteOneMessage(messageID, userID) {
        try {
            //validate if user can delete message
            let { canDeleteMessage, message } = await this.validateIfUserCanDeleteMessage(messageID, userID);
            if (!canDeleteMessage)
                throw new ValidationError("User can't delete this message.");
            //delete file if message type is file
            if (message.type !== "text")
                await this.storage.deleteFiles([message.content]);
            //delete message form db
            await this.messageDB.deleteOneMessageForOneChatForOneUser(messageID, userID);
            //notify receptors
            let receptors = [];
            message.messageVerificationStatus.forEach(status => receptors.push({ userID: status.receptorUserID, isAdmin: false }));
            let ack = await this.notifyReceptors(receptors, message.chat_id, message, EVENT_ON_MESSAGE_DELETE);
        }
        catch (error) {
            throw error;
        }
    }
    async deleteManyMessagesFromOneChat(messageIDs, userID, chatID) {
        try {
            //validate if user can delete messages for this chat
            let { receptors, messages, canDeleteMessages } = await this.validateIfUserCanDeleteMessagesFromChat(messageIDs, userID, chatID);
            if (!canDeleteMessages)
                throw new ValidationError("User can't delete these messages.");
            //delete files from storage
            let fileMessagesUrls = [];
            messages.forEach(message => {
                if (message.type !== "text")
                    fileMessagesUrls.push(message.content);
            });
            if (fileMessagesUrls.length > 0)
                await this.storage.deleteFiles(fileMessagesUrls);
            //delete messages from db
            await this.messageDB.deleteManyMessagesForOneChatForOneUser(messageIDs, userID);
            //notify receptors
            let ack = await this.notifyReceptors(receptors, chatID, messages, EVENT_ON_MESSAGE_DELETE);
        }
        catch (error) {
            throw error;
        }
    }
    //utility functions
    async validateIfUserCanSendMessageToThisChat(chatID, userID) {
        let chatMembers = await this.chatDB.readAllChatMembers(chatID);
        let canSendMessage = chatMembers.some(member => member.userID === userID);
        return { canSendMessage, chatMembers };
    }
    async validateIfUserCanEditMessage(messageID, userID) {
        let message = await this.messageDB.readOneMessageByID(messageID);
        let canEditMessage = ((message.emisorUserID === userID) && (message.type === "text"));
        return { message, canEditMessage };
    }
    async validateIfUserCanDeleteMessage(messageID, userID) {
        let message = await this.messageDB.readOneMessageByID(messageID);
        let canDeleteMessage = message.emisorUserID === userID;
        return { message, canDeleteMessage };
    }
    async validateIfUserCanDeleteMessagesFromChat(messageIDs, userID, chatID) {
        let messages = await this.messageDB.readManyMessagesByID(messageIDs);
        let canDeleteMessages = true;
        let receptors = [];
        messages[0].messageVerificationStatus.forEach(status => receptors.push({ userID: status.receptorUserID, isAdmin: false }));
        messages.forEach(message => {
            canDeleteMessages = canDeleteMessages && (message.emisorUserID === userID) && message.chat_id === chatID;
        });
        return { messages, receptors, canDeleteMessages };
    }
    validateIfAllMessageHaveSameChatIDAndEmisorID(messages) {
        let allMessagesHaveSameChatID = true;
        let allMessagesHavSameEmisorID = true;
        let chatID = "";
        let emisorID = "";
        messages.forEach((message, i) => {
            if (i === 1) {
                chatID = message.chat_id;
                emisorID = message.emisorUserID;
            }
            allMessagesHaveSameChatID = chatID === message.chat_id;
            allMessagesHavSameEmisorID = emisorID === message.emisorUserID;
        });
        return allMessagesHavSameEmisorID && allMessagesHaveSameChatID;
    }
    buildMessageVerifications(userID, chatMembers) {
        let messageStatusVerifications = [];
        let receptors = chatMembers.filter(receptor => receptor.userID !== userID);
        receptors.forEach(receptor => {
            messageStatusVerifications.push({ receptorUserID: receptor.userID, isRead: false, isRecieved: false });
        });
        return { receptors, messageStatusVerifications };
    }
    async uploadFileIfMessageTypeIsFile(message, type) {
        let fileURL = [""];
        if (typeof message === "string")
            return fileURL[0];
        const messageFile = message;
        const filePath = `${STORAGE_ROOT}/${type}s/${Date.now()}-${messageFile.originalName}`;
        fileURL = await this.storage.uploadFiles([messageFile.buffer], filePath);
        return fileURL[0];
    }
    async saveMessageInDBBeforeSending(messageForDB, chatID) {
        let savedMessage = messageForDB;
        await this.transactionManager.executeTransaction(async () => {
            savedMessage = await this.messageDB.createMessage(messageForDB);
            await this.chatDB.updateChatLastUpdatedDate(chatID, new Date());
        });
        return savedMessage;
    }
    async notifyReceptors(receptors, chatID, data, event) {
        let ack = { error: false, data: [{}] };
        if (receptors.length > 1)
            ack = await this.socketEmiter.emit2RoomWithAckAndRetry(chatID, event, data);
        if (receptors.length === 1)
            ack = await this.socketEmiter.emit21SocketWithAckAndRetry(receptors[0].userID, event, data);
        return ack;
    }
    async updateMessageRecievedVerificationinDB(ack, messageID) {
        if (ack.data.length > 1) {
            let userIDs = [];
            ack.data.forEach(status => {
                let messageStatus = status;
                userIDs.push(messageStatus.receptorUserID);
            });
            await this.messageDB.updateMessageIsRecievedVerificationForManyUsers(messageID, userIDs, true);
        }
        if (ack.data.length === 1) {
            let status = ack.data[0];
            await this.messageDB.updateMessageIsRecievedVerificationForOneUser(messageID, status.receptorUserID, true);
        }
    }
    async updateManyMessageRecievedVerificationinDB(ack, messageIDs) {
        console.log(ack);
        let userIDs = [];
        ack.data.forEach(status => {
            let messageStatus = status;
            userIDs.push(messageStatus.receptorUserID);
        });
        await this.messageDB.updateManyMessagesIsRecievedVerificationForManyUsers(messageIDs, userIDs, true);
    }
    async processMessagesToSend(messages) {
        let readyMessages = [];
        let failedMessages = [];
        let fileUrl = [];
        let promise = messages.map(async (message) => {
            try {
                if (!(typeof message.content === "string") && message.type !== "text") {
                    //validar que el tipo supuesto corresponda con el tipo de archivo
                    let messageFile = message.content;
                    fileUrl = await this.storage.uploadFiles([messageFile.buffer], `${STORAGE_ROOT}/${message.type}s/${Date.now()}-${messageFile.originalName}`);
                    message.content = fileUrl[0];
                }
                readyMessages.push(message);
            }
            catch (error) {
                message.content = "failed";
                failedMessages.push(message);
            }
        });
        await Promise.all(promise);
        return { readyMessages, failedMessages };
    }
}
export { MessageService };
