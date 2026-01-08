import { iStorage } from "../../service-component/v1.0.0/storage-interface/iStorage.js";
declare class SupabaseStorage implements iStorage {
    private supabase;
    private bucket;
    constructor(url: string, key: string);
    uploadFiles(file: Buffer[], filePath: string): Promise<string[]>;
    deleteFiles(location: string[]): Promise<void>;
}
export { SupabaseStorage };
