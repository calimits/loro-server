import { MessageMongoDBModel } from "./MessageMongoDBModel.js";
import { Message } from "./models/MessageModel.js";
export const messageDB = new MessageMongoDBModel(Message);
