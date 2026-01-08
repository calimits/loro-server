import { Request, Response } from "express";
import { ChatService } from "../../service-component/v1.0.0/ChatService.js";
declare class ChatServiceController {
    private chatService;
    constructor(chatService: ChatService);
    getAllChats41User(req: Request, res: Response): Promise<void>;
    getAllArchivedChats41User(req: Request, res: Response): Promise<void>;
    getAllUnArchivedChats41User(req: Request, res: Response): Promise<void>;
    getAllChatMembers(req: Request, res: Response): Promise<void>;
    createChat(req: Request, res: Response): Promise<void>;
    addMember2Chat(req: Request, res: Response): Promise<void>;
    updateChatInfo(req: Request, res: Response): Promise<void>;
    updateChatName(req: Request, res: Response): Promise<void>;
    updateChatDescription(req: Request, res: Response): Promise<void>;
    updateMemberAdminStatus41Chat(req: Request, res: Response): Promise<void>;
    updateManyMembersAdminStatus41Chat(req: Request, res: Response): Promise<void>;
    updateChatArchivedStatus41Member(req: Request, res: Response): Promise<void>;
    deleteOneChatMember(req: Request, res: Response): Promise<void>;
    deleteManyChatMembers(req: Request, res: Response): Promise<void>;
    getRoutes(): {
        getAllChats41User: (req: Request, res: Response) => Promise<void>;
        getAllArchivedChats41User: (req: Request, res: Response) => Promise<void>;
        getAllUnArchivedChats41User: (req: Request, res: Response) => Promise<void>;
        getAllChatMembers: (req: Request, res: Response) => Promise<void>;
        createChat: (req: Request, res: Response) => Promise<void>;
        addMember2Chat: (req: Request, res: Response) => Promise<void>;
        updateChatInfo: (req: Request, res: Response) => Promise<void>;
        updateChatName: (req: Request, res: Response) => Promise<void>;
        updateChatDescription: (req: Request, res: Response) => Promise<void>;
        updateMemberAdminStatus41Chat: (req: Request, res: Response) => Promise<void>;
        updateManyMembersAdminStatus41Chat: (req: Request, res: Response) => Promise<void>;
        updateChatArchivedStatus41Member: (req: Request, res: Response) => Promise<void>;
        deleteOneChatMember: (req: Request, res: Response) => Promise<void>;
        deleteManyChatMembers: (req: Request, res: Response) => Promise<void>;
    };
}
export { ChatServiceController };
