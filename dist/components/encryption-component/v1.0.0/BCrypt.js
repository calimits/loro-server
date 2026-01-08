import bcrypt from "bcrypt";
class BCrypt {
    async encrypt(text) {
        let cryptedText = await bcrypt.hash(text, 10);
        return cryptedText;
    }
    async compare(cryptedText, text) {
        let isEqual = await bcrypt.compare(text, cryptedText);
        return isEqual;
    }
}
export { BCrypt };
