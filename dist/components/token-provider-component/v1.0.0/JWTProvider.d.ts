import { iTokenProvider } from "../../service-component/v1.0.0/token-provider-interface/iTokenProvider.js";
declare class JWTProvider implements iTokenProvider {
    generateToken(payload: object, secret: string, expiresIn?: number): Promise<string>;
    verifyToken(token: string, secret: string): Promise<object>;
}
export { JWTProvider };
