import express from "express";
import { createServer } from "http";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import { SocketioServer } from "./SocketioServer.js";
class ExpressServerWithSockets {
    routers;
    expressApp;
    server;
    socketServer;
    DOMAIN;
    PORT;
    constructor(port, domain, routers) {
        this.expressApp = express();
        this.server = createServer(this.expressApp);
        this.socketServer = new SocketioServer(this.server);
        this.socketServer.setUpSocketListeners();
        this.DOMAIN = domain;
        this.PORT = port;
        this.routers = routers;
    }
    setDomain(domain) {
        this.DOMAIN = domain;
        return this;
    }
    setPort(port) {
        this.PORT = port;
        return this;
    }
    configGlobalMiddleWare() {
        //configuring cors for dev, change origin for production
        this.expressApp.use(cors({
            origin: "*",
            methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            allowedHeaders: ["Content-type", "Authorization"]
        }));
        this.expressApp.use(morgan("dev"));
        this.expressApp.use(helmet());
        this.expressApp.use(express.json({ limit: '50mb' }));
        this.expressApp.use(express.urlencoded({ extended: true }));
        return this;
    }
    configRoutes() {
        this.routers.forEach(router => {
            this.expressApp.use(router);
        });
        return this;
    }
    async listen(message) {
        this.server.listen(this.PORT, () => {
            console.log(`Listening on http://localhost:${this.PORT}`, message);
        });
        return;
    }
}
export { ExpressServerWithSockets };
