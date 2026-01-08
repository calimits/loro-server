import { chatDB } from "../../../database-component/v1.0.0/ChatMongoDBModelInstance.js";
import { messageDB } from "../../../database-component/v1.0.0/MessageMongoDBModelInstance.js";
import { mongoTransactionManager } from "../../../database-component/v1.0.0/MongoTransactionManagerInstance.js";
import { tokenDB } from "../../../database-component/v1.0.0/TokenMongoDBModelInstance.js";
import { userDB } from "../../../database-component/v1.0.0/UserMongoDBModelInstance.js";
import { bcrypt } from "../../../encryption-component/v1.0.0/BCryptInstance.js";
import { socketStorage } from "../../../server-component/v1.0.0/SocketStorageInstance.js";
import { ChatService } from "../../../service-component/v1.0.0/ChatService.js";
import { MessageService } from "../../../service-component/v1.0.0/MessageService.js";
import { UserService } from "../../../service-component/v1.0.0/UserService.js";
import { SupabaseStorage } from "../../../storage-component/v1.0.0/SupabaseStorage.js";
import { jwtProvider } from "../../../token-provider-component/v1.0.0/JWTProviderInstance.js";
import { validatorFactory } from "../../../validation-component/v1.0.0/ValidatorFactoryInstance.js";
export function createServices(socketEmitter) {
    const msgService = new MessageService(messageDB, chatDB, new SupabaseStorage(String(process.env.SUPABASE_URL), String(process.env.SUPABASE_KEY)), mongoTransactionManager, socketEmitter);
    const chatService = new ChatService(chatDB, socketEmitter, socketStorage);
    const userService = new UserService(userDB, bcrypt, jwtProvider, validatorFactory, tokenDB, mongoTransactionManager, new SupabaseStorage(String(process.env.SUPABASE_URL), String(process.env.SUPABASE_KEY)));
    return { msgService, chatService, userService };
}
