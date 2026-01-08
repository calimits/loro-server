import { jwtProvider } from "../../token-provider-component/v1.0.0/JWTProviderInstance.js";
import { AuthMiddleware } from "./AuthMiddleware.js";
export const auth = new AuthMiddleware(jwtProvider);
