import { Router } from "express";
import { auth } from "../../../middleware-component/v1.0.0/AuthMiddlewareInstance.js";
import { upload } from "../../../middleware-component/v1.0.0/multer.js";
export function getMessageServiceRouter(messageServiceController) {
    const MessageServiceRoutes = Router();
    const mc = messageServiceController.getRoutes();
    const am = auth.getMiddleware();
    MessageServiceRoutes.get("/messages/:chatID/:userID", am.auth, mc.getChatMessages41User); //get messages sended and recieved for one user for one chat
    MessageServiceRoutes.get("/messages/unrecieved/:chatID/:userID", am.auth, mc.getUnrecievedChatMessages41User); //get unrecieved messages for one chat for one user
    MessageServiceRoutes.get("/messages/all/unrecieved/:userID", am.auth, mc.getAllUnrecievedMessages41User); //get unrecieved messages for one chat for one user
    MessageServiceRoutes.get("/messages/status/:userID/:messageID", am.auth, mc.getMessageStatusVerification); //get status verification for one message
    MessageServiceRoutes.get("/messages/status/:chatID/:userID", am.auth, mc.getManyMessagesStatusVerification); //get status verification for many messages
    MessageServiceRoutes.post("/messages/send-one", am.auth, upload.single("content"), mc.sendMessage); //post one or many messages
    MessageServiceRoutes.post("/messages/send-many", am.auth, upload.array("fileContents"), mc.sendManyMessages); //post one or many messages
    MessageServiceRoutes.put("/messages/text-content/:messageID/:userID", am.auth, mc.updateOneTextMessage); //update one message text content
    MessageServiceRoutes.put("/messages/recieved-status/:userID", am.auth, mc.updateManyMessagesRecievedStatus41User); //update many messages recieved status for one user
    MessageServiceRoutes.put("/messages/read-status/:userID", am.auth, mc.updateManyMessagesReadStatus41User); //update many messages read status for one user
    MessageServiceRoutes.delete("/messages/delete/:messageID/:userID", am.auth, mc.delete1Msg); //delete one message, only the sender can delete
    MessageServiceRoutes.delete("/messages/delete-many/:chatID/:userID", am.auth, mc.deleteManyMsgs); //delete many messages, only the sender can delete
    return MessageServiceRoutes;
}
