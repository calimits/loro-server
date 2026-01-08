import { ChatServiceController } from "../../../controllers-components/v1.0.0/ChatServiceController.js";
import { MessageServiceController } from "../../../controllers-components/v1.0.0/MessageServiceController.js";
import { UserServiceController } from "../../../controllers-components/v1.0.0/UserServiceController.js";
import { ChatService } from "../../../service-component/v1.0.0/ChatService.js";
import { MessageService } from "../../../service-component/v1.0.0/MessageService.js";
import { UserService } from "../../../service-component/v1.0.0/UserService.js";
type Controllers = {
    msgServiceController: MessageServiceController;
    chatServiceController: ChatServiceController;
    userServiceController: UserServiceController;
};
declare function createControllers(msgService: MessageService, chatService: ChatService, userService: UserService): Controllers;
export { Controllers, createControllers };
