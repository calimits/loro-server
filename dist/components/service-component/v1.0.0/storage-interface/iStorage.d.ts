interface iStorage {
    uploadFiles(file: Buffer[], filePath: string): Promise<string[]>;
    deleteFiles(location: string[]): Promise<void>;
}
export { iStorage };
