import { iValidator } from "../service-component/v1.0.0/validator-interface/iValidator.js";
import { iValidatorFactory } from "../service-component/v1.0.0/validator-interface/iValidatorFactory.js";
declare class ValidatorFactory implements iValidatorFactory {
    createEmailValidator(): iValidator;
    createNameValidator(): iValidator;
    createPasswordValidator(): iValidator;
}
export { ValidatorFactory };
