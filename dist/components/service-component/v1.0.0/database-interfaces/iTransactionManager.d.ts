interface iTransactionManager {
    executeTransaction(callback: () => Promise<void>): Promise<void>;
}
export { iTransactionManager };
