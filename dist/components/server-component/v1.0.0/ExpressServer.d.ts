import { Express, Router } from "express";
import { iWebServer } from "./iWebServer.js";
declare class ExpressServer implements iWebServer {
    private routers;
    private expressApp;
    DOMAIN: String;
    PORT: number;
    constructor(port: number, domain: String);
    getServer(): Express;
    setDomain(domain: String): this;
    setPort(port: number): this;
    setRouters(routers: Array<Router>): void;
    configGlobalMiddleWare(): this;
    listen(message: String): Promise<void>;
}
export { ExpressServer };
