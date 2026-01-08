import { iStorage } from "../../components/service-component/v1.0.0/storage-interface/iStorage.js";
declare class SupabaseStorage implements iStorage {
    uploadFiles(file: Buffer[], filePath: string): Promise<string[]>;
    deleteFiles(location: string[]): Promise<void>;
}
export { SupabaseStorage };
