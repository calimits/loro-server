import { User } from "./models/UserModel.js";
import { UserMongoDbModel } from "./UserMongoDBModel.js";
export const userDB = new UserMongoDbModel(User);
