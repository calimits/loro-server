import mongoose from "mongoose";
import { DBError } from "../../error-component/v1.0.0/DBError.js";
import { AsyncLocalStorage } from "async_hooks";
const asyncSessionStorage = new AsyncLocalStorage();
class MongoTransactionManager {
    async executeTransaction(callback) {
        const session = await mongoose.startSession();
        return asyncSessionStorage.run(session, async () => {
            try {
                session.startTransaction();
                await callback();
                await session.commitTransaction();
            }
            catch (error) {
                await session.abortTransaction();
                let knownError = error;
                throw new DBError(knownError.message);
            }
            finally {
                await session.endSession();
            }
        });
    }
}
export { MongoTransactionManager, asyncSessionStorage };
