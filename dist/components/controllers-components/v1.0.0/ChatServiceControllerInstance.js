import { chatService } from "../../service-component/v1.0.0/ChatServiceInstance.js";
import { ChatServiceController } from "./ChatServiceController.js";
export const chatServiceController = new ChatServiceController(chatService);
