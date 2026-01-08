import { iServerHttp } from "../../main-component/v1.0.0/iServerHttp.js";
import { Router } from "express";
declare class ExpressServerWithSockets implements iServerHttp {
    private routers;
    private expressApp;
    private server;
    private socketServer;
    DOMAIN: String;
    PORT: number;
    constructor(port: number, domain: String, routers: Array<Router>);
    setDomain(domain: String): this;
    setPort(port: number): this;
    configGlobalMiddleWare(): this;
    configRoutes(): this;
    listen(message: String): Promise<void>;
}
export { ExpressServerWithSockets };
