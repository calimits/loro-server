class PasswordValidator {
    validate(text) {
        const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[/?@$!%*?&])[A-Za-z\d/?@$!%*?&]{8,30}$/;
        return regexPassword.test(text);
    }
}
export { PasswordValidator };
