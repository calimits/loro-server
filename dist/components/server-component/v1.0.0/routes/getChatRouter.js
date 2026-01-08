import { Router } from "express";
import { auth } from "../../../middleware-component/v1.0.0/AuthMiddlewareInstance.js";
export function getChatServiceRouter(chatServiceController) {
    const ChatServiceRoutes = Router();
    const cc = chatServiceController.getRoutes();
    const am = auth.getMiddleware();
    ChatServiceRoutes.get("/chats/:userID", am.auth, cc.getAllChats41User); //get all chats for one user
    ChatServiceRoutes.get("/chats/archived/:userID", am.auth, cc.getAllArchivedChats41User); //get all archived chats for one user
    ChatServiceRoutes.get("/chats/unarchived/:userID", am.auth, cc.getAllUnArchivedChats41User); //get all unarchived chats for one user
    ChatServiceRoutes.get("/chats/members/:chatID", am.auth, cc.getAllChatMembers); //get all chat members for one user
    ChatServiceRoutes.post("/chats", am.auth, cc.createChat); //creates a chat
    ChatServiceRoutes.post("/chats/:chatID/:userID/:memberID", am.auth, cc.addMember2Chat); //add member to chat
    //ChatServiceRoutes.post("/chats/members/", mockFunc) //add many member to chat
    ChatServiceRoutes.put("/chats/update/:chatID/:userID", am.auth, cc.updateChatInfo); //update chat info
    ChatServiceRoutes.put("/chats/update/name/:chatID/:userID", am.auth, cc.updateChatName); //update chat field (name, descrtiption)
    ChatServiceRoutes.put("/chats/update/description/:chatID/:userID", am.auth, cc.updateChatDescription); //update chat field (name, descrtiption)
    ChatServiceRoutes.put("/chats/update/members/is-admin/:chatID/:userID/:memberID", am.auth, cc.updateMemberAdminStatus41Chat); //update member status field (archived, admin)
    ChatServiceRoutes.put("/chats/update/members/is-archived/:chatID/:userID", am.auth, cc.updateChatArchivedStatus41Member); //update member status field (archived, admin)
    ChatServiceRoutes.put("/chats/update/members/is-admin/:chatID/:userID", am.auth, cc.updateManyMembersAdminStatus41Chat); //update many members status field (admin)
    ChatServiceRoutes.delete("/chats/members/:chatID/:userID/:memberID", am.auth, cc.deleteOneChatMember); //delete member from chat
    ChatServiceRoutes.delete("/chats/members/:chatID/:userID", am.auth, cc.deleteManyChatMembers); //delete many members from chat
    //ChatServiceRoutes.delete("/chats/:chatID", mockFunc) //delete one Chat
    return ChatServiceRoutes;
}
