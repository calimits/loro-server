import { ChatMongoDBModel } from "./ChatMongoDBModel.js";
import { Chat } from "./models/ChatModel.js";
export const chatDB = new ChatMongoDBModel(Chat);
