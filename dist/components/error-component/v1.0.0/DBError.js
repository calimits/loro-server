import { AppError } from "./AppError.js";
class DBError extends AppError {
    constructor(message) {
        super(message, "DB Error", 500);
    }
}
export { DBError };
