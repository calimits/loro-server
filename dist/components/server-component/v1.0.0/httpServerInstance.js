import http from 'http';
import { expressServer } from './ExpressServerInstance.js';
let expressApp = expressServer.getServer();
export const httpServer = http.createServer(expressApp);
