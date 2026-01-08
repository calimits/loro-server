import { iMultiprotocolServer } from "./iMultiProtocolServer.js";
import http from 'http';
declare class IntegratedServer implements iMultiprotocolServer {
    private PORT;
    private httpServer;
    constructor(PORT: number, httpServer: http.Server);
    start(): Promise<void>;
}
export { IntegratedServer };
