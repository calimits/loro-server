import dotenv from "dotenv";
class Dotenv {
    setUp() {
        dotenv.config();
        return this;
    }
}
export { Dotenv };
