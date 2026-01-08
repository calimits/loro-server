declare class AppError extends Error {
    name: string;
    code: number;
    constructor(message?: string, name?: string, code?: number);
}
export { AppError };
