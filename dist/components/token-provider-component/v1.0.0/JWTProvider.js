import jwt from "jsonwebtoken";
class JWTProvider {
    generateToken(payload, secret, expiresIn = 1000) {
        let token = jwt.sign({ ...payload }, secret, { expiresIn });
        return Promise.resolve(token);
    }
    verifyToken(token, secret) {
        const decoded = jwt.verify(token, secret);
        return Promise.resolve(decoded);
    }
}
export { JWTProvider };
