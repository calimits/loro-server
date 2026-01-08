import { Mongoose } from "mongoose";
import { iDatabaseClient } from "../../service-component/v1.0.0/database-interfaces/iDatabaseClient.js";
declare class MongoDBClient implements iDatabaseClient {
    private mongoClient;
    constructor(mongoClient: Mongoose);
    connect(connectionURL: String): Promise<void>;
    close(): Promise<void>;
}
export { MongoDBClient };
