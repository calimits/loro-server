import { Dotenv } from "../../components/environment-config-component/v1.0.0/Dotenv.js";
import { MongoDBClient } from "../../components/database-component/v1.0.0/MongoDBClient.js";
import { UserMongoDbModel } from "../../components/database-component/v1.0.0/UserMongoDBModel.js";
import { User } from "../../components/database-component/v1.0.0/models/UserModel.js";
import mongoose from "mongoose";
import { ChatMongoDBModel } from "../../components/database-component/v1.0.0/ChatMongoDBModel.js";
import { Chat } from "../../components/database-component/v1.0.0/models/ChatModel.js";
import { MessageMongoDBModel } from "../../components/database-component/v1.0.0/MessageMongoDBModel.js";
import { Message } from "../../components/database-component/v1.0.0/models/MessageModel.js";
import { MongoTransaction } from "../../components/database-component/v1.0.0/MongoTransaction.js";
import { UserService } from "../../components/service-component/v1.0.0/UserService.js";
import { BCrypt } from "../../components/encryption-component/BCrypt.js";
import { JWTProvider } from "../../components/token-provider-component/JWTProvider.js";
import { AppError } from "../../components/error-component/AppError.js";
const dotenv = new Dotenv();
dotenv.setUp();
const mongoClient = new MongoDBClient(String(process.env.DB), mongoose);
const userModel = new UserMongoDbModel(User);
const chatModel = new ChatMongoDBModel(Chat);
const messageModel = new MessageMongoDBModel(Message);
const mongoTransaction = new MongoTransaction();
await mongoClient.connect();
let userDB = new UserMongoDbModel(User);
let bcrypt = new BCrypt();
let tokenProvider = new JWTProvider("kjjahsdkjhkjhoihiasljhasdlj");
let userService = new UserService(userDB, bcrypt, tokenProvider);
let users = await userService.getUserByID("6885409b17777535d86daef7");
let jwt = new JWTProvider(String(process.env.JWT_SECRET));
function throwError() {
    throw new AppError("an error ocurred", "db error", 300);
}
try {
    await userModel.createUser({
        username: "brogei",
        email: "juajuaasdas.ascdasom",
        password: "aksdhkasjdhkasd",
        profilePhotoURL: "aljksdhkajsd",
        description: "alsjdhklajsd",
        contacts: []
    });
}
catch (error) {
    console.log(error);
}
