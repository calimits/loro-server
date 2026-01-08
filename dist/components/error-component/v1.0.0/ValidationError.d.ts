import { AppError } from "./AppError.js";
declare class ValidationError extends AppError {
    constructor(message: string);
}
export { ValidationError };
