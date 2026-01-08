class SupabaseStorage {
    async uploadFiles(file, filePath) {
        return Promise.resolve(["/mock-url/file.img.com"]);
    }
    async deleteFiles(location) {
        return;
    }
}
export { SupabaseStorage };
