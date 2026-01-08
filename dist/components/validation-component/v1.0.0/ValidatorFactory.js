import { EmailValidator } from "./EmailValidator.js";
import { NameValidator } from "./NameValidator.js";
import { PasswordValidator } from "./PasswordValidator.js";
class ValidatorFactory {
    createEmailValidator() {
        return new EmailValidator();
    }
    createNameValidator() {
        return new NameValidator();
    }
    createPasswordValidator() {
        return new PasswordValidator();
    }
}
export { ValidatorFactory };
