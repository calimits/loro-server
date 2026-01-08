import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
class ExpressServer {
    routers;
    expressApp;
    DOMAIN;
    PORT;
    constructor(port, domain) {
        this.expressApp = express();
        this.DOMAIN = domain;
        this.PORT = port;
        this.routers = [];
    }
    getServer() {
        return this.expressApp;
    }
    setDomain(domain) {
        this.DOMAIN = domain;
        return this;
    }
    setPort(port) {
        this.PORT = port;
        return this;
    }
    setRouters(routers) {
        this.routers = routers;
    }
    configGlobalMiddleWare() {
        //configuring cors for dev, change origin for production
        this.expressApp.use(cors({
            origin: "http://localhost:5173", //cambiar
            credentials: true,
            methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            allowedHeaders: ["Content-type", "Authorization"]
        }));
        this.expressApp.use(morgan("dev"));
        this.expressApp.use(helmet());
        this.expressApp.use(cookieParser());
        this.expressApp.use(express.json({ limit: '50mb' }));
        this.expressApp.use(express.urlencoded({ extended: true }));
        return this;
    }
    async listen(message) {
        this.expressApp.listen(this.PORT, () => {
            console.log(message);
        });
        return;
    }
}
export { ExpressServer };
