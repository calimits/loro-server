import mongoose, { Model } from "mongoose";
import { iTokenDB } from "../../service-component/v1.0.0/database-interfaces/iTokenDB.js";
import { Token } from "../../../types/TokenTypes.js";
declare class TokenMongoDBModel implements iTokenDB {
    private tokenModel;
    private session;
    private withOptionalSession;
    constructor(tokenModel: Model<Token>, session?: mongoose.ClientSession | null);
    createToken(token: Token): Promise<void>;
    createTokens(tokens: Token[]): Promise<void>;
    readToken(tokenString: string): Promise<Token>;
    deleteToken(tokenString: string): Promise<void>;
    deleteAllTokens41User(userID: string): Promise<void>;
    deleteAllAccessTokens41User(userID: string): Promise<void>;
}
export { TokenMongoDBModel };
