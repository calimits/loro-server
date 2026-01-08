interface iDatabaseClient {
    connect(connectionURL: String): Promise<void>;
    close(): Promise<void>;
}
export { iDatabaseClient };
