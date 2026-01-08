class AppError extends Error {
    name;
    code;
    constructor(message = "An error ocurred", name = "default error", code = 500) {
        super(message);
        this.name = name;
        this.code = code;
    }
}
export { AppError };
