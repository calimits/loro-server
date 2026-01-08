import { ErrorController } from "./ErrorController.js";
class ChatServiceController {
    chatService;
    constructor(chatService) {
        this.chatService = chatService;
    }
    async getAllChats41User(req, res) {
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
            const chats = await this.chatService.getAllChatsForOneUser(userID, start, limit);
            res.status(200).json(chats);
        }
        catch (error) {
            ErrorController.e404(req, res, error);
        }
    }
    async getAllArchivedChats41User(req, res) {
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
            const chats = await this.chatService.getAllArchivedChatsForOneUser(userID, start, limit);
            res.status(200).json(chats);
        }
        catch (error) {
            ErrorController.e404(req, res, error);
        }
    }
    async getAllUnArchivedChats41User(req, res) {
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
            const chats = await this.chatService.getAllUnarchivedChatsForOneUser(userID, start, limit);
            res.status(200).json(chats);
        }
        catch (error) {
            ErrorController.e404(req, res, error);
        }
    }
    async getAllChatMembers(req, res) {
        try {
            const chatID = req.params.chatID;
            const members = await this.chatService.getAllChatMembers(chatID);
            res.status(200).json(members);
        }
        catch (error) {
            ErrorController.e404(req, res, error);
        }
    }
    async createChat(req, res) {
        try {
            const userID = req.body.userID;
            const chat = req.body.chat;
            if (req.user?.id !== userID) {
                ErrorController.e401(req, res, new Error("ID doesn't match userID."));
                return;
            }
            const _id = await this.chatService.createChat({
                name: chat.name, description: chat.description,
                chatUsers: chat.chatUsers, lastUpdated: new Date(chat.lastUpdated)
            }, userID);
            console.log("llegamos aqui");
            res.status(200).json({ info: "Chat created succesfully.", code: 200, _id });
        }
        catch (error) {
            ErrorController.e500(req, res, error);
        }
    }
    async addMember2Chat(req, res) {
        try {
            const userID = req.params.userID;
            const memberID = req.params.memberID;
            const chatID = req.params.chatID;
            if (req.user?.id !== userID) {
                ErrorController.e401(req, res, new Error("ID doesn't match userID."));
                return;
            }
            await this.chatService.addMember2Chat(chatID, userID, memberID);
            res.status(200).json({ info: "Member added succesfully.", code: 200 });
        }
        catch (error) {
            ErrorController.e500(req, res, error);
        }
    }
    async updateChatInfo(req, res) {
        try {
            const userID = req.params.userID;
            const chatID = req.params.chatID;
            const name = req.body.name;
            const description = req.body.description;
            if (req.user?.id !== userID) {
                ErrorController.e401(req, res, new Error("ID doesn't match userID."));
                return;
            }
            await this.chatService.updateChatInfo(chatID, userID, { name, description });
            res.status(200).json({ info: "Chat updated succesfully.", code: 200 });
        }
        catch (error) {
            ErrorController.e500(req, res, error);
        }
    }
    async updateChatName(req, res) {
        try {
            const userID = req.params.userID;
            const chatID = req.params.chatID;
            const name = req.body.name;
            if (req.user?.id !== userID) {
                ErrorController.e401(req, res, new Error("ID doesn't match userID."));
                return;
            }
            await this.chatService.updateChatName(chatID, userID, name);
            res.status(200).json({ info: "Chat name updated succesfully.", code: 200 });
        }
        catch (error) {
            ErrorController.e500(req, res, error);
        }
    }
    async updateChatDescription(req, res) {
        try {
            const userID = req.params.userID;
            const chatID = req.params.chatID;
            const description = req.body.description;
            if (req.user?.id !== userID) {
                ErrorController.e401(req, res, new Error("ID doesn't match userID."));
                return;
            }
            await this.chatService.updateChatDescription(chatID, userID, description);
            res.status(200).json({ info: "Chat description updated succesfully.", code: 200 });
        }
        catch (error) {
            ErrorController.e500(req, res, error);
        }
    }
    async updateMemberAdminStatus41Chat(req, res) {
        try {
            const userID = req.params.userID;
            const chatID = req.params.chatID;
            const memberID = req.params.memberID;
            const isAdmin = req.body.isAdmin;
            if (req.user?.id !== userID) {
                ErrorController.e401(req, res, new Error("ID doesn't match userID."));
                return;
            }
            await this.chatService.updateMemberAdminStatusFrom1CHat(chatID, userID, memberID, isAdmin);
            res.status(200).json({ info: "Member admin status updated succesfully.", code: 200 });
        }
        catch (error) {
            ErrorController.e500(req, res, error);
        }
    }
    async updateManyMembersAdminStatus41Chat(req, res) {
        try {
            const userID = req.params.userID;
            const chatID = req.params.userID;
            const memberIDs = req.body.memberIDs;
            const isAdmin = req.body.isAdmin;
            if (req.user?.id !== userID) {
                ErrorController.e401(req, res, new Error("ID doesn't match userID."));
                return;
            }
            await this.chatService.updateManyMemberAdminStatusFrom1Chat(chatID, userID, memberIDs, isAdmin);
            res.status(200).json({ info: "Members admin status updated succesfully.", code: 200 });
        }
        catch (error) {
            ErrorController.e500(req, res, error);
        }
    }
    async updateChatArchivedStatus41Member(req, res) {
        try {
            const userID = req.params.userID;
            const chatID = req.params.userID;
            const isArchived = req.body.isArchived;
            if (req.user?.id !== userID) {
                ErrorController.e401(req, res, new Error("ID doesn't match userID."));
                return;
            }
            await this.chatService.updateMemberArchivedStatusFrom1Chat(chatID, userID, isArchived);
            res.status(200).json({ info: "Member admin status updated succesfully.", code: 200 });
        }
        catch (error) {
            ErrorController.e500(req, res, error);
        }
    }
    async deleteOneChatMember(req, res) {
        try {
            const userID = req.params.userID;
            const chatID = req.params.chatID;
            const memberID = req.params.memberID;
            if (req.user?.id !== userID) {
                ErrorController.e401(req, res, new Error("ID doesn't match userID."));
                return;
            }
            await this.chatService.deleteMemberFromChat(chatID, memberID, userID);
            res.status(200).json({ info: 'Member deleted succesfully.', code: 200 });
        }
        catch (error) {
            ErrorController.e500(req, res, error);
        }
    }
    async deleteManyChatMembers(req, res) {
        try {
            const userID = req.params.userID;
            const chatID = req.params.userID;
            const memberIDs = req.body.memberIDs;
            if (req.user?.id !== userID) {
                ErrorController.e401(req, res, new Error("ID doesn't match userID."));
                return;
            }
            await this.chatService.deleteManyMembersFromChat(chatID, memberIDs, userID);
            res.status(200).json({ info: 'Members deleted succesfully.', code: 200 });
        }
        catch (error) {
            ErrorController.e500(req, res, error);
        }
    }
    getRoutes() {
        return {
            getAllChats41User: this.getAllChats41User.bind(this),
            getAllArchivedChats41User: this.getAllArchivedChats41User.bind(this),
            getAllUnArchivedChats41User: this.getAllUnArchivedChats41User.bind(this),
            getAllChatMembers: this.getAllChatMembers.bind(this),
            createChat: this.createChat.bind(this),
            addMember2Chat: this.addMember2Chat.bind(this),
            updateChatInfo: this.updateChatInfo.bind(this),
            updateChatName: this.updateChatName.bind(this),
            updateChatDescription: this.updateChatDescription.bind(this),
            updateMemberAdminStatus41Chat: this.updateMemberAdminStatus41Chat.bind(this),
            updateManyMembersAdminStatus41Chat: this.updateManyMembersAdminStatus41Chat.bind(this),
            updateChatArchivedStatus41Member: this.updateChatArchivedStatus41Member.bind(this),
            deleteOneChatMember: this.deleteOneChatMember.bind(this),
            deleteManyChatMembers: this.deleteManyChatMembers.bind(this)
        };
    }
}
export { ChatServiceController };
