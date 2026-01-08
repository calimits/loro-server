import mongoose from "mongoose";
import { DBError } from "../../error-component/DBError.js";
class MongoTransaction {
    session;
    constructor() {
        this.session = null;
    }
    async startTransaction() {
        try {
            this.session = await mongoose.startSession();
            this.session.startTransaction();
        }
        catch (error) {
            let knownError = error;
            throw new DBError(knownError.message);
        }
    }
    async commit() {
        if (!this.session)
            throw new DBError("No active transaction");
        try {
            await this.session.commitTransaction();
            await this.session.endSession();
        }
        catch (error) {
            let knownError = error;
            throw new DBError(knownError.message);
        }
    }
    async rollback() {
        if (!this.session)
            throw new DBError("No active transaction");
        try {
            await this.session.abortTransaction();
            await this.session.endSession();
        }
        catch (error) {
            let knownError = error;
            throw new DBError(knownError.message);
        }
    }
    getSession() {
        if (!this.session)
            throw new DBError("No session opened");
        return this.session;
    }
}
export { MongoTransaction };
