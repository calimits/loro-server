import { Token } from "./models/TokenModel.js";
import { TokenMongoDBModel } from "./TokenMongoDBModel.js";
export const tokenDB = new TokenMongoDBModel(Token);
