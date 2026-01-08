import { Request, Response } from "express";
import { MessageService } from "../../service-component/v1.0.0/MessageService.js";
declare class MessageServiceController {
    private messageService;
    constructor(messageService: MessageService);
    getChatMessages41User(req: Request, res: Response): Promise<void>;
    getUnrecievedChatMessages41User(req: Request, res: Response): Promise<void>;
    getAllUnrecievedMessages41User(req: Request, res: Response): Promise<void>;
    getMessageStatusVerification(req: Request, res: Response): Promise<void>;
    getManyMessagesStatusVerification(req: Request, res: Response): Promise<void>;
    sendMessage(req: Request, res: Response): Promise<void>;
    sendManyMessages(req: Request, res: Response): Promise<void>;
    updateOneTextMessage(req: Request, res: Response): Promise<void>;
    updateManyMessagesRecievedStatus41User(req: Request, res: Response): Promise<void>;
    updateManyMessagesReadStatus41User(req: Request, res: Response): Promise<void>;
    delete1Msg(req: Request, res: Response): Promise<void>;
    deleteManyMsgs(req: Request, res: Response): Promise<void>;
    getRoutes(): {
        getChatMessages41User: (req: Request, res: Response) => Promise<void>;
        getUnrecievedChatMessages41User: (req: Request, res: Response) => Promise<void>;
        getAllUnrecievedMessages41User: (req: Request, res: Response) => Promise<void>;
        getMessageStatusVerification: (req: Request, res: Response) => Promise<void>;
        getManyMessagesStatusVerification: (req: Request, res: Response) => Promise<void>;
        sendMessage: (req: Request, res: Response) => Promise<void>;
        sendManyMessages: (req: Request, res: Response) => Promise<void>;
        updateOneTextMessage: (req: Request, res: Response) => Promise<void>;
        updateManyMessagesRecievedStatus41User: (req: Request, res: Response) => Promise<void>;
        updateManyMessagesReadStatus41User: (req: Request, res: Response) => Promise<void>;
        delete1Msg: (req: Request, res: Response) => Promise<void>;
        deleteManyMsgs: (req: Request, res: Response) => Promise<void>;
    };
}
export { MessageServiceController };
