import { Request, Response, NextFunction } from 'express';
import { iTokenProvider } from '../../service-component/v1.0.0/token-provider-interface/iTokenProvider.js';
declare class AuthMiddleware {
    private tokenProvider;
    constructor(tokenProvider: iTokenProvider);
    auth(req: Request, res: Response, next: NextFunction): Promise<void>;
    getMiddleware(): {
        auth: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    };
}
export { AuthMiddleware };
