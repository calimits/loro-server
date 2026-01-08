import { getChatServiceRouter } from "../../../server-component/v1.0.0/routes/getChatRouter.js";
import { getMessageServiceRouter } from "../../../server-component/v1.0.0/routes/getMessageRouter.js";
import { getUserServiceRouter } from "../../../server-component/v1.0.0/routes/getUserRouter.js";
export function configRoutes(server, controllers) {
    const msgRouter = getMessageServiceRouter(controllers.msgServiceController);
    const chatRouter = getChatServiceRouter(controllers.chatServiceController);
    const userRouter = getUserServiceRouter(controllers.userServiceController);
    const expressApp = server.getServer();
    expressApp.use(msgRouter);
    expressApp.use(chatRouter);
    expressApp.use(userRouter);
}
