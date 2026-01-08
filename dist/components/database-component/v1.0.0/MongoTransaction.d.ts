import mongoose from "mongoose";
import { iTransactionManager } from "../../service-component/v1.0.0/database-interfaces/iTransactionManager.js";
declare class MongoTransaction implements iTransactionManager {
    private session;
    constructor();
    startTransaction(): Promise<void>;
    commit(): Promise<void>;
    rollback(): Promise<void>;
    getSession(): mongoose.ClientSession;
}
export { MongoTransaction };
