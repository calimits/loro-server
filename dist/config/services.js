import mongoose from "mongoose";
import { ChatMongoDBModel } from "../components/database-component/v1.0.0/ChatMongoDBModel.js";
import { MessageMongoDBModel } from "../components/database-component/v1.0.0/MessageMongoDBModel.js";
import { Chat } from "../components/database-component/v1.0.0/models/ChatModel.js";
import { Message } from "../components/database-component/v1.0.0/models/MessageModel.js";
import { Token } from "../components/database-component/v1.0.0/models/TokenModel.js";
import { User } from "../components/database-component/v1.0.0/models/UserModel.js";
import { MongoDBClient } from "../components/database-component/v1.0.0/MongoDBClient.js";
import { MongoTransactionManager } from "../components/database-component/v1.0.0/MongoTransactionManager.js";
import { TokenMongoDBModel } from "../components/database-component/v1.0.0/TokenMongoDBModel.js";
import { UserMongoDbModel } from "../components/database-component/v1.0.0/UserMongoDBModel.js";
import { BCrypt } from "../components/encryption-component/v1.0.0/BCrypt.js";
import { UserService } from "../components/service-component/v1.0.0/UserService.js";
import { JWTProvider } from "../components/token-provider-component/v1.0.0/JWTProvider.js";
import { ValidatorFactory } from "../components/validation-component/v1.0.0/ValidatorFactory.js";
import { SupabaseStorage } from "../tests/mocks/SupabaseStorage.js";
//creating DBs
const userDB = new UserMongoDbModel(User);
const messageDB = new MessageMongoDBModel(Message);
const chatDB = new ChatMongoDBModel(Chat);
const tokenDB = new TokenMongoDBModel(Token);
const transactionManager = new MongoTransactionManager();
const dbCLient = new MongoDBClient(String(process.env.DB), mongoose);
//creating other objects
const encryptor = new BCrypt();
const tokenProvider = new JWTProvider();
const validatorFactory = new ValidatorFactory();
const storage = new SupabaseStorage();
const userService = new UserService(userDB, encryptor, tokenProvider, validatorFactory, tokenDB, transactionManager, storage);
