import { ErrorController } from '../../controllers-components/v1.0.0/ErrorController.js';
class AuthMiddleware {
    tokenProvider;
    constructor(tokenProvider) {
        this.tokenProvider = tokenProvider;
    }
    async auth(req, res, next) {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            ErrorController.e401(req, res, new Error("No token provided."));
            return;
        }
        try {
            const decoded = await this.tokenProvider.verifyToken(token, String(process.env.SECRET_ACCESS_KEY));
            req.user = decoded;
            next();
        }
        catch (err) {
            ErrorController.e400(req, res, err);
        }
    }
    getMiddleware() {
        return {
            auth: this.auth.bind(this)
        };
    }
}
export { AuthMiddleware };
