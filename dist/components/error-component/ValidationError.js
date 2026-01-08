import { AppError } from "./AppError.js";
class ValidationError extends AppError {
    constructor(message) {
        super(message, "Validation Error", 500);
    }
}
export { ValidationError };
