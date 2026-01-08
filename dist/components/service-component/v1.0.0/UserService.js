import { DEFAULT_CONTACTS, DEFAULT_LOCATION_FOR_PHOTOS, DEFAULT_PROFILE_DESCRIPTION, DEFAULT_PROFILE_PICTURE } from "../../../constants/default.js";
import { DBError } from "../../error-component/v1.0.0/DBError.js";
import { ValidationError } from "../../error-component/v1.0.0/ValidationError.js";
class UserService {
    userDB;
    tokenDB;
    transactionManager;
    storage;
    encryptor;
    tokenProvider;
    validatorFactory;
    constructor(userDB, encryptor, tokenProvider, validatorFactory, tokenDB, transactionManager, storage) {
        this.userDB = userDB;
        this.encryptor = encryptor;
        this.tokenProvider = tokenProvider;
        this.validatorFactory = validatorFactory;
        this.tokenDB = tokenDB;
        this.transactionManager = transactionManager;
        this.storage = storage;
    }
    //implementar setters para la construccion
    async getAllUsers(start = 0, limit = 50) {
        if (start < 0)
            start = 0;
        let users;
        try {
            users = await this.userDB.readAllUsers(start, limit);
            return users;
        }
        catch (error) {
            let knownError = error;
            throw new DBError(knownError.message);
        }
    }
    async getUserByID(userID) {
        let user;
        try {
            user = await this.userDB.readUserByID(userID);
            return user;
        }
        catch (error) {
            let knownError = error;
            throw new DBError(knownError.message);
        }
    }
    async getUserByName(name) {
        let user;
        try {
            user = await this.userDB.readUserByName(name);
            return user;
        }
        catch (error) {
            let knownError = error;
            throw new DBError(knownError.message);
        }
    }
    async getManyUsersById(IDs) {
        let users;
        try {
            users = await this.userDB.readManyUsersByID(IDs);
            return users;
        }
        catch (error) {
            let knownError = error;
            throw new DBError(knownError.message);
        }
    }
    async getUserContacts(userID, start = 0, limit = 50) {
        let contacts = new Map();
        try {
            let contactIDs = await this.userDB.readContacts(userID, start, limit);
            let contactsInfo = await this.userDB.readManyUsersByID(contactIDs);
            contactsInfo.forEach(contact => {
                contacts.set(contact.username, contact._id);
            });
            return contacts;
        }
        catch (error) {
            let knownError = error;
            throw new DBError(knownError.message);
        }
    }
    async loginUser(username, password) {
        try {
            let refreshToken;
            let accessToken;
            let user4Auth = await this.userDB.readUserForAuth(username);
            let isSamePassword = await this.encryptor.compare(user4Auth.password, password);
            if (!isSamePassword)
                throw new ValidationError("Password don't match");
            let user = await this.userDB.readUserByName(username);
            refreshToken = await this.tokenProvider.generateToken({ id: user._id, username: user.username }, String(process.env.SECRET_REFRESH_KEY), 604800);
            accessToken = await this.tokenProvider.generateToken({ id: user._id, username: user.username }, String(process.env.SECRET_ACCESS_KEY), 1800);
            await this.tokenDB.createTokens([{ token: refreshToken, userID: user._id, type: "refresh" }, { token: accessToken, userID: user._id, type: "access" }]);
            return [{ type: "refresh", token: refreshToken, userID: user._id }, { type: "access", token: accessToken, userID: user._id }];
        }
        catch (error) {
            throw error;
        }
    }
    async logout(refreshToken, userID) {
        try {
            await this.tokenDB.deleteAllTokens41User(userID);
        }
        catch (error) {
            throw error;
        }
    }
    async registerUser(username, email, password) {
        try {
            //validations
            let nameValidationResult = this.validatorFactory.createNameValidator().validate(username);
            let emailValidationResult = this.validatorFactory.createEmailValidator().validate(email);
            let passwordValidationResult = this.validatorFactory.createPasswordValidator().validate(password);
            //checking validations
            if (!nameValidationResult)
                throw new ValidationError("Username Validation failed.");
            if (!emailValidationResult)
                throw new ValidationError("Email Validation failed.");
            if (!passwordValidationResult)
                throw new ValidationError("Password Validation failed.");
            //defining new user
            const hashPassword = await this.encryptor.encrypt(password);
            let newUser = { username, email, password: hashPassword, profilePhotoURL: DEFAULT_PROFILE_PICTURE,
                description: DEFAULT_PROFILE_DESCRIPTION, contacts: DEFAULT_CONTACTS };
            //saving new user
            await this.userDB.createUser(newUser);
        }
        catch (error) {
            throw error;
        }
    }
    async refreshUserTokens(refreshToken) {
        try {
            await this.tokenDB.readToken(refreshToken); //throws an error if not founded
            let decoded = await this.tokenProvider.verifyToken(refreshToken, String(process.env.SECRET_REFRESH_KEY));
            //updated tokens
            const newAccessToken = await this.tokenProvider.generateToken({ id: decoded.id, username: decoded.username }, String(process.env.SECRET_ACCESS_KEY), 1800);
            const newRefreshToken = await this.tokenProvider.generateToken({ id: decoded.id, username: decoded.username }, String(process.env.SECRET_REFRESH_KEY), 604800);
            this.transactionManager.executeTransaction(async () => {
                await this.tokenDB.deleteAllAccessTokens41User(decoded.id);
                await this.tokenDB.createTokens([{ type: "refresh", token: newRefreshToken, userID: decoded.id },
                    { type: "access", token: newAccessToken, userID: decoded.id }]);
            });
            return [{ type: "refresh", token: newRefreshToken, userID: decoded.id }, { type: "access", token: newAccessToken, userID: decoded.id }];
            ;
        }
        catch (error) {
            throw error;
        }
    }
    async addContact2User(userID, contactName) {
        try {
            let contactInfo = await this.userDB.readUserByName(contactName);
            await this.userDB.createContact(userID, String(contactInfo._id));
        }
        catch (error) {
            throw error;
        }
    }
    async updateUserName(id, username) {
        try {
            await this.userDB.updateUserName(id, username);
        }
        catch (error) {
            throw error;
        }
    }
    async updateUserDescription(id, description) {
        try {
            await this.userDB.updateUserDescription(id, description);
        }
        catch (error) {
            throw error;
        }
    }
    async updateUserEmail(id, email) {
        try {
            await this.userDB.updateUserEmail(id, email);
        }
        catch (error) {
            throw error;
        }
    }
    async updateUserPassword(username, newPassword, oldPassword) {
        try {
            let user4Auth = await this.userDB.readUserForAuth(username);
            let isSamePassword = await this.encryptor.compare(user4Auth.password, oldPassword);
            if (!isSamePassword)
                throw new ValidationError("Old password don't match");
            const hashNewPassword = await this.encryptor.encrypt(newPassword);
            await this.userDB.updateUserPassword(user4Auth._id, hashNewPassword);
        }
        catch (error) {
            throw error;
        }
    }
    async updateUserProfilePhoto(id, photo) {
        try {
            //delete old photo
            const userInfo = await this.userDB.readUserByID(id);
            if (userInfo.profilePhotoURL !== DEFAULT_PROFILE_PICTURE)
                await this.storage.deleteFiles([userInfo.profilePhotoURL]);
            //save image in storage
            const photoURL = await this.storage.uploadFiles([photo.buffer], `${DEFAULT_LOCATION_FOR_PHOTOS}/${Date.now()}-${photo.originalName}`);
            //save photo url in db
            await this.userDB.updateUserProfilePhoto(id, photoURL[0]);
        }
        catch (error) {
            throw error;
        }
    }
    async deleteUser(userID) {
        try {
            const userInfo = await this.userDB.readUserByID(userID);
            const photoPath = userInfo.profilePhotoURL;
            await this.transactionManager.executeTransaction(async () => {
                await this.userDB.deleteUser(userID);
                //await this.storage.deleteFiles([photoPath]);
            });
        }
        catch (error) {
            throw error;
        }
    }
    async deleteContactOf1User(userID, contactID) {
        try {
            await this.userDB.deleteContact(userID, contactID);
        }
        catch (error) {
            throw error;
        }
    }
    async deleteManyContactsOf1User(userID, contactIDs) {
        try {
            await this.userDB.deleteManyContacts(userID, contactIDs);
        }
        catch (error) {
            throw error;
        }
    }
}
export { UserService };
