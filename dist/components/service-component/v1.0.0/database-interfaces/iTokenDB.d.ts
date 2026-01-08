import { Token } from "../../../../types/TokenTypes.js";
interface iTokenDB {
    createToken(token: Token): Promise<void>;
    createTokens(tokens: Token[]): Promise<void>;
    readToken(tokenString: string): Promise<Token>;
    deleteToken(tokenString: string): Promise<void>;
    deleteAllTokens41User(userID: string): Promise<void>;
    deleteAllAccessTokens41User(userID: string): Promise<void>;
}
export { iTokenDB };
