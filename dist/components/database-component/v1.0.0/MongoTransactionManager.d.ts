import mongoose from "mongoose";
import { iTransactionManager } from "../../service-component/v1.0.0/database-interfaces/iTransactionManager.js";
import { AsyncLocalStorage } from "async_hooks";
declare const asyncSessionStorage: AsyncLocalStorage<mongoose.mongo.ClientSession>;
declare class MongoTransactionManager implements iTransactionManager {
    executeTransaction(callback: () => Promise<void>): Promise<void>;
}
export { MongoTransactionManager, asyncSessionStorage };
