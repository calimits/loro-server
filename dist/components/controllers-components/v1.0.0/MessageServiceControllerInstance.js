import { messageService } from "../../service-component/v1.0.0/MessageServiceInstance.js";
import { MessageServiceController } from "./MessageServiceController.js";
export const messageServiceController = new MessageServiceController(messageService);
