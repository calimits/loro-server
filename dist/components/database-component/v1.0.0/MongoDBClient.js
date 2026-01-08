class MongoDBClient {
    mongoClient;
    constructor(mongoClient) {
        this.mongoClient = mongoClient;
    }
    async connect(connectionURL) {
        try {
            await this.mongoClient.connect(`${connectionURL}`);
            console.log('Connection to MongoDB established');
        }
        catch (err) {
            console.error('Error connecting to MongoDB:', err);
            process.exit(1);
        }
    }
    async close() {
        try {
            await this.mongoClient.connection.close();
            console.log("Connection to MongoDB closed succesfully");
        }
        catch (error) {
            console.log("Error closing connection to MongoDB");
        }
    }
}
export { MongoDBClient };
