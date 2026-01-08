import { Request, Response } from 'express';
declare class ErrorController {
    static e400(req: Request, res: Response, error: Error): Promise<void>;
    static e401(req: Request, res: Response, error: Error): Promise<void>;
    static e404(req: Request, res: Response, error: Error): Promise<void>;
    static e500(req: Request, res: Response, error: Error): Promise<void>;
}
export { ErrorController };
