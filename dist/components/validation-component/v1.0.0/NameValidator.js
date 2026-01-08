class NameValidator {
    validate(text) {
        const regexName = /[a-zA-Z0-9_]+/;
        return regexName.test(text);
    }
}
export { NameValidator };
