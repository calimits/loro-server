interface iDatabaseTransactionManager {
    startTransaction(): Promise<void>;
    endTransaction(): Promise<void>;
    commit(): Promise<void>;
    rollback(): Promise<void>;
}
export { iDatabaseTransactionManager };
