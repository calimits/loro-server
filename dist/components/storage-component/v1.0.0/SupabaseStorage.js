import { createClient } from "@supabase/supabase-js";
class SupabaseStorage {
    supabase;
    bucket = "loro-storage";
    constructor(url, key) {
        this.supabase = createClient(url, key);
    }
    async uploadFiles(file, filePath) {
        try {
            const { data, error } = await this.supabase.storage
                .from(this.bucket)
                .upload(filePath, file[0]);
            if (error)
                throw error;
            const { data: { publicUrl } } = this.supabase.storage
                .from(this.bucket)
                .getPublicUrl(filePath);
            return [publicUrl];
        }
        catch (error) {
            throw error;
        }
    }
    async deleteFiles(location) {
        try {
            const filePaths = [];
            location.forEach(url => {
                try {
                    const urlParts = url.split('/storage/v1/object/public/');
                    if (urlParts.length !== 2)
                        throw new Error('URL pública no válida');
                    const pathWithBucket = urlParts[1];
                    const filePath = pathWithBucket.split(`${this.bucket}/`);
                    filePaths.push(filePath[1]);
                }
                catch (error) {
                    //nothing baby skip
                }
            });
            const { error } = await this.supabase
                .storage
                .from(this.bucket)
                .remove(filePaths);
            if (error)
                throw error;
        }
        catch (error) {
            throw error;
        }
    }
}
export { SupabaseStorage };
