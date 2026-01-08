import { SocketEmitter } from "../../../tests/mocks/SocketEmitter.js";
import { SupabaseStorage } from "../../../tests/mocks/SupabaseStorage.js";
import { chatDB } from "../../database-component/v1.0.0/ChatMongoDBModelInstance.js";
import { messageDB } from "../../database-component/v1.0.0/MessageMongoDBModelInstance.js";
import { mongoTransactionManager } from "../../database-component/v1.0.0/MongoTransactionManagerInstance.js";
import { MessageService } from "./MessageService.js";
//supabase y socket emitter needs to be implemented
export const messageService = new MessageService(messageDB, chatDB, new SupabaseStorage(), mongoTransactionManager, new SocketEmitter());
