import { iValidator } from "./iValidator.js";
interface iValidatorFactory {
    createNameValidator(): iValidator;
    createEmailValidator(): iValidator;
    createPasswordValidator(): iValidator;
}
export { iValidatorFactory };
