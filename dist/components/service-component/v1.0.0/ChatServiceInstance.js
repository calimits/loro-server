import { SocketEmitter } from "../../../tests/mocks/SocketEmitter.js";
import { SocketStorage } from "../../../tests/mocks/SocketStorage.js";
import { chatDB } from "../../database-component/v1.0.0/ChatMongoDBModelInstance.js";
import { ChatService } from "./ChatService.js";
//socket emitter and storage needs to be implemented
export const chatService = new ChatService(chatDB, new SocketEmitter(), new SocketStorage());
