import { ErrorController } from "./ErrorController.js";
class MessageServiceController {
    messageService;
    constructor(messageService) {
        this.messageService = messageService;
    }
    async getChatMessages41User(req, res) {
        try {
            const chatID = req.params.chatID;
            const userID = req.params.userID;
            let start = 0, limit = 50;
            if (req.query.start !== undefined)
                start = parseInt(req.query.start);
            if (req.query.limit !== undefined)
                limit = parseInt(req.query.limit);
            if (req.user?.id !== userID) {
                ErrorController.e401(req, res, new Error("ID doesn't match userID."));
                return;
            }
            const messages = await this.messageService.getChatMessagesForOneUser(chatID, userID, start, limit);
            res.status(200).json(messages);
        }
        catch (error) {
            ErrorController.e404(req, res, error);
        }
    }
    async getUnrecievedChatMessages41User(req, res) {
        try {
            const chatID = req.params.chatID;
            const userID = req.params.userID;
            let start = 0, limit = 50;
            if (req.query.start !== undefined)
                start = parseInt(req.query.start);
            if (req.query.limit !== undefined)
                limit = parseInt(req.query.limit);
            if (req.user?.id !== userID) {
                ErrorController.e401(req, res, new Error("ID doesn't match userID."));
                return;
            }
            const messages = await this.messageService.getUnrecievedChatMessagesForOneUser(chatID, userID, start, limit);
            res.status(200).json(messages);
        }
        catch (error) {
            ErrorController.e404(req, res, error);
        }
    }
    async getAllUnrecievedMessages41User(req, res) {
        try {
            const userID = req.params.userID;
            let start = 0, limit = 50;
            if (req.query.start !== undefined)
                start = parseInt(req.query.start);
            if (req.query.limit !== undefined)
                limit = parseInt(req.query.limit);
            if (req.user?.id !== userID) {
                ErrorController.e401(req, res, new Error("ID doesn't match userID."));
                return;
            }
            const messages = await this.messageService.getAllUnrecievedMessageForOneUser(userID, start, limit);
            res.status(200).json(messages);
        }
        catch (error) {
            ErrorController.e404(req, res, error);
        }
    }
    async getMessageStatusVerification(req, res) {
        try {
            const userID = req.params.userID;
            const messageID = req.params.messageID;
            if (req.user?.id !== userID) {
                ErrorController.e401(req, res, new Error("ID doesn't match userID."));
                return;
            }
            const status = await this.messageService.getMessageStatusVerificationForOneUser(messageID, userID);
            res.status(200).json(status);
        }
        catch (error) {
            ErrorController.e404(req, res, error);
        }
    }
    async getManyMessagesStatusVerification(req, res) {
        try {
            const userID = req.params.userID;
            const messageIDs = req.body.messageIDs;
            if (req.user?.id !== userID) {
                ErrorController.e401(req, res, new Error("ID doesn't match userID."));
                return;
            }
            const status = await this.messageService.getManyMessageStatusVerificationForOneUser(messageIDs, userID);
            res.status(200).json(status);
        }
        catch (error) {
            ErrorController.e404(req, res, error);
        }
    }
    async sendMessage(req, res) {
        try {
            const chat_id = req.body.chatID;
            const type = req.body.type;
            const emisorUserID = req.body.emisorUserID;
            const dateTime = req.body.dateTime;
            if (req.user?.id !== emisorUserID) {
                ErrorController.e401(req, res, new Error("ID doesn't match userID."));
                return;
            }
            let content;
            if (req.file) {
                content = { originalName: req.file.originalname, size: req.file.size,
                    buffer: req.file.buffer, mimeType: req.file.mimetype };
            }
            else {
                content = req.body.content;
            }
            const date = new Date(dateTime);
            const message = { chat_id, type, emisorUserID, dateTime: date, content };
            const msgID = await this.messageService.sendMessage(message);
            res.status(200).json({ info: "Message sended succesfully.", code: 200, msgID });
        }
        catch (error) {
            ErrorController.e500(req, res, error);
        }
    }
    async sendManyMessages(req, res) {
        try {
            const textMsgs = JSON.parse(req.body.textMsgs);
            const fileMsgContents = Array.isArray(req.files) ? req.files : undefined;
            const fileMsgsInfo = req.body.msgsInfo ? JSON.parse(req.body.msgsInfo) : undefined;
            const userID = textMsgs ? textMsgs[0].emisorUserID : fileMsgsInfo[0].emisorUserID;
            if (req.user?.id !== userID) {
                ErrorController.e401(req, res, new Error("ID doesn't match userID."));
                return;
            }
            const messages = [];
            textMsgs.forEach(msg => {
                messages.push({ chat_id: msg.chat_id, emisorUserID: msg.emisorUserID, type: msg.type,
                    content: msg.content, dateTime: new Date(msg.dateTime) });
            });
            if (fileMsgContents && fileMsgsInfo) {
                if (fileMsgContents.length !== fileMsgsInfo.length)
                    throw new Error("File messages have incorrect format.");
                fileMsgContents.forEach((file, i) => {
                    messages.push({ chat_id: fileMsgsInfo[i].chat_id, type: fileMsgsInfo[i].type,
                        emisorUserID: fileMsgsInfo[i].emisorUserID, dateTime: new Date(fileMsgsInfo[i].dateTime),
                        content: { originalName: file.originalname, size: file.size, mimeType: file.mimetype, buffer: file.buffer }
                    });
                });
            }
            const resData = await this.messageService.sendManyMessagesToOneChat(messages);
            res.status(200).json({ info: "Messages sended succesfully.", code: 200, resData });
        }
        catch (error) {
            console.log(error);
            ErrorController.e500(req, res, error);
        }
    }
    async updateOneTextMessage(req, res) {
        try {
            const messageID = req.params.messageID;
            const userID = req.params.userID;
            const textContent = req.body.content;
            if (req.user?.id !== userID) {
                ErrorController.e401(req, res, new Error("ID doesn't match userID."));
                return;
            }
            await this.messageService.updateOneTextMessage(messageID, userID, textContent);
            res.status(200).json({ info: "Message updated succesfully", code: 200 });
        }
        catch (error) {
            ErrorController.e500(req, res, error);
        }
    }
    async updateManyMessagesRecievedStatus41User(req, res) {
        try {
            const userID = req.params.userID;
            const msgIDs = req.body.msdIDs;
            if (req.user?.id !== userID) {
                ErrorController.e401(req, res, new Error("ID doesn't match userID."));
                return;
            }
            await this.messageService.updateManyMessagesRecievedStatusForOneUser(msgIDs, userID, true);
            res.status(200).json({ info: "Messages recieved status updated succesfully", code: 200 });
        }
        catch (error) {
            ErrorController.e500(req, res, error);
        }
    }
    async updateManyMessagesReadStatus41User(req, res) {
        try {
            const userID = req.params.userID;
            const msgIDs = req.body.msdIDs;
            if (req.user?.id !== userID) {
                ErrorController.e401(req, res, new Error("ID doesn't match userID."));
                return;
            }
            await this.messageService.updateManyMessagesReadStatusForOneUser(msgIDs, userID, true);
            res.status(200).json({ info: "Messages read status updated succesfully", code: 200 });
        }
        catch (error) {
            ErrorController.e500(req, res, error);
        }
    }
    async delete1Msg(req, res) {
        try {
            const userID = req.params.userID;
            const messageID = req.params.messageID;
            if (req.user?.id !== userID) {
                ErrorController.e401(req, res, new Error("ID doesn't match userID."));
                return;
            }
            await this.messageService.deleteOneMessage(messageID, userID);
            res.status(200).json({ info: "Message deleted succesfully", code: 200 });
        }
        catch (error) {
            ErrorController.e500(req, res, error);
        }
    }
    async deleteManyMsgs(req, res) {
        try {
            const userID = req.params.userID;
            const chatID = req.params.chatID;
            const msgIDs = req.body.msgIDs;
            if (req.user?.id !== userID) {
                ErrorController.e401(req, res, new Error("ID doesn't match userID."));
                return;
            }
            await this.messageService.deleteManyMessagesFromOneChat(msgIDs, userID, chatID);
            res.status(200).json({ info: "Messages deleted succesfully", code: 200 });
        }
        catch (error) {
            ErrorController.e500(req, res, error);
        }
    }
    getRoutes() {
        return {
            getChatMessages41User: this.getChatMessages41User.bind(this),
            getUnrecievedChatMessages41User: this.getUnrecievedChatMessages41User.bind(this),
            getAllUnrecievedMessages41User: this.getAllUnrecievedMessages41User.bind(this),
            getMessageStatusVerification: this.getMessageStatusVerification.bind(this),
            getManyMessagesStatusVerification: this.getManyMessagesStatusVerification.bind(this),
            sendMessage: this.sendMessage.bind(this),
            sendManyMessages: this.sendManyMessages.bind(this),
            updateOneTextMessage: this.updateOneTextMessage.bind(this),
            updateManyMessagesRecievedStatus41User: this.updateManyMessagesRecievedStatus41User.bind(this),
            updateManyMessagesReadStatus41User: this.updateManyMessagesReadStatus41User.bind(this),
            delete1Msg: this.delete1Msg.bind(this),
            deleteManyMsgs: this.deleteManyMsgs.bind(this)
        };
    }
}
export { MessageServiceController };
