import { iEncryptor } from "../../service-component/v1.0.0/encryption-interface/iEncryptor.js";
declare class BCrypt implements iEncryptor {
    encrypt(text: string): Promise<string>;
    compare(cryptedText: string, text: string): Promise<boolean>;
}
export { BCrypt };
