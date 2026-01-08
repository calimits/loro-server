import { iValidator } from "../service-component/v1.0.0/validator-interface/iValidator.js";
declare class EmailValidator implements iValidator {
    validate(text: string): boolean;
}
export { EmailValidator };
