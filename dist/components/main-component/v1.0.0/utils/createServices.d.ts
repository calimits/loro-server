import { ChatService } from "../../../service-component/v1.0.0/ChatService.js";
import { MessageService } from "../../../service-component/v1.0.0/MessageService.js";
import { iSocketEmmiter } from "../../../service-component/v1.0.0/socket-interface/iSocketEmitter.js";
import { UserService } from "../../../service-component/v1.0.0/UserService.js";
type Services = {
    msgService: MessageService;
    chatService: ChatService;
    userService: UserService;
};
export declare function createServices(socketEmitter: iSocketEmmiter): Services;
export {};
