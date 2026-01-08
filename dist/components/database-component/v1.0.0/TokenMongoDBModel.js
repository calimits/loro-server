import { DBError } from "../../error-component/v1.0.0/DBError.js";
import { asyncSessionStorage } from "./MongoTransactionManager.js";
class TokenMongoDBModel {
    tokenModel;
    session;
    withOptionalSession(options = {}) {
        const session = asyncSessionStorage.getStore();
        if (!session)
            return { ...options };
        return {
            ...options,
            ...(session && { session })
        };
    }
    constructor(tokenModel, session = null) {
        this.tokenModel = tokenModel;
        this.session = session;
    }
    async createToken(token) {
        try {
            await this.tokenModel.create([token], this.withOptionalSession({}));
        }
        catch (error) {
            let knownError = error;
            throw new DBError(knownError.message);
        }
    }
    async createTokens(tokens) {
        try {
            await this.tokenModel.create(tokens, this.withOptionalSession({ ordered: true }));
        }
        catch (error) {
            let knownError = error;
            throw new DBError(knownError.message);
        }
    }
    async readToken(tokenString) {
        try {
            let token;
            token = await this.tokenModel.findOne({ token: tokenString }, {}, this.withOptionalSession({}));
            if (token === null)
                throw new DBError("Token not found in DB.");
            return token;
        }
        catch (error) {
            let knownError = error;
            throw new DBError(knownError.message);
        }
    }
    async deleteToken(tokenString) {
        try {
            await this.tokenModel.findOneAndDelete({ token: tokenString }, this.withOptionalSession({}));
        }
        catch (error) {
            let knownError = error;
            throw new DBError(knownError.message);
        }
    }
    async deleteAllTokens41User(userID) {
        try {
            await this.tokenModel.deleteMany({ userID: userID }, this.withOptionalSession({}));
        }
        catch (error) {
            let knownError = error;
            throw new DBError(knownError.message);
        }
    }
    async deleteAllAccessTokens41User(userID) {
        try {
            await this.tokenModel.deleteMany({ userID: userID, type: "access" }, this.withOptionalSession({}));
        }
        catch (error) {
            let knownError = error;
            throw new DBError(knownError.message);
        }
    }
}
export { TokenMongoDBModel };
