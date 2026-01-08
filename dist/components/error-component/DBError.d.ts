import { AppError } from "./AppError.js";
declare class DBError extends AppError {
    constructor(message: string);
}
export { DBError };
