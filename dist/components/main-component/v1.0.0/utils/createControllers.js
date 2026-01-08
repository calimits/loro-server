import { ChatServiceController } from "../../../controllers-components/v1.0.0/ChatServiceController.js";
import { MessageServiceController } from "../../../controllers-components/v1.0.0/MessageServiceController.js";
import { UserServiceController } from "../../../controllers-components/v1.0.0/UserServiceController.js";
function createControllers(msgService, chatService, userService) {
    const msgServiceController = new MessageServiceController(msgService), chatServiceController = new ChatServiceController(chatService), userServiceController = new UserServiceController(userService);
    return { msgServiceController, chatServiceController, userServiceController };
}
export { createControllers };
