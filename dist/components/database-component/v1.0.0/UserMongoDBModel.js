import { Types } from "mongoose";
import { DBError } from "../../error-component/v1.0.0/DBError.js";
import { asyncSessionStorage } from "./MongoTransactionManager.js";
class UserMongoDbModel {
    userModel;
    withOptionalSession(options = {}) {
        const session = asyncSessionStorage.getStore();
        if (!session)
            return { ...options };
        return {
            ...options,
            ...(session && { session })
        };
    }
    constructor(userModel) {
        this.userModel = userModel;
    }
    //Create
    async createUser(user) {
        try {
            await this.userModel.create([user], this.withOptionalSession({}));
        }
        catch (error) {
            let knownError = error;
            throw new DBError(knownError.message);
        }
    }
    async createManyUsers(users) {
        try {
            await this.userModel.create(users, this.withOptionalSession({ ordered: true }));
        }
        catch (error) {
            let knownError = error;
            throw new DBError(knownError.message);
        }
    }
    async createContact(userID, contactID) {
        try {
            await this.userModel.findOneAndUpdate({ _id: userID }, { $addToSet: { contacts: contactID.trim() } });
        }
        catch (error) {
            let knownError = error;
            throw new DBError(knownError.message);
        }
    }
    //Read
    async readUserForAuth(name) {
        try {
            let userAuth;
            userAuth = await this.userModel.findOne({ username: name }, { username: true, email: true, password: true, _id: true });
            if (userAuth === null)
                throw new Error("User not found");
            return userAuth;
        }
        catch (error) {
            let knownError = error;
            throw new DBError(knownError.message);
        }
    }
    async readUserByID(id) {
        try {
            let userProfile;
            userProfile = await this.userModel.findById(id, {
                username: true, email: true, _id: true,
                description: true, profilePhotoURL: true
            });
            if (userProfile === null)
                throw new Error("User not found");
            return userProfile;
        }
        catch (error) {
            let knownError = error;
            throw new DBError(knownError.message);
        }
    }
    async readUserByEmail(email) {
        try {
            let userProfile;
            userProfile = await this.userModel.findOne({ email: email }, {
                username: true, email: true, _id: true,
                description: true, profilePhotoURL: true
            });
            if (userProfile === null)
                throw new Error("User not found");
            return userProfile;
        }
        catch (error) {
            let knownError = error;
            throw new DBError(knownError.message);
        }
    }
    async readUserByName(name) {
        try {
            let userProfile;
            userProfile = await this.userModel.findOne({ username: name }, {
                username: true, email: true, _id: true,
                description: true, profilePhotoURL: true
            });
            if (userProfile === null)
                throw new Error("User not found");
            return userProfile;
        }
        catch (error) {
            let knownError = error;
            throw new DBError(knownError.message);
        }
    }
    async readManyUsersByID(ids) {
        const objectIDs = ids.map(id => new Types.ObjectId(id));
        try {
            let userProfiles;
            userProfiles = await this.userModel.find({ _id: { $in: objectIDs } }, {
                username: true, email: true, _id: true,
                description: true, profilePhotoURL: true
            });
            if (userProfiles === null)
                throw new Error("Users not found");
            return userProfiles;
        }
        catch (error) {
            let knownError = error;
            throw new DBError(knownError.message);
        }
    }
    async readManyUsersByEmail(emails) {
        try {
            let userProfiles;
            userProfiles = await this.userModel.find({ email: { $in: emails } }, {
                username: true, email: true, _id: true,
                description: true, profilePhotoURL: true
            });
            return userProfiles;
        }
        catch (error) {
            let knownError = error;
            throw new DBError(knownError.message);
        }
    }
    async readManyUsersByName(names) {
        try {
            let userProfiles;
            userProfiles = await this.userModel.find({ username: { $in: names } }, {
                username: true, email: true, _id: true,
                description: true, profilePhotoURL: true
            });
            return userProfiles;
        }
        catch (error) {
            let knownError = error;
            throw new DBError(knownError.message);
        }
    }
    async readAllUsers(start = 0, limit = 20) {
        try {
            let userProfiles;
            userProfiles = await this.userModel.find({}, {
                username: true, email: true, _id: true,
                description: true, profilePhotoURL: true
            })
                .skip(start)
                .limit(limit);
            return userProfiles;
        }
        catch (error) {
            let knownError = error;
            throw new DBError(knownError.message);
        }
    }
    async readContacts(userID, start = 0, limit = 50) {
        try {
            let res = await this.userModel.findById(userID);
            let length = res?.contacts.length || 0;
            if (limit > length)
                limit = length;
            if (start > length)
                return [];
            let contacts = res?.contacts.slice(start, start + limit) || [];
            return contacts;
        }
        catch (error) {
            let knownError = error;
            throw new DBError(knownError.message);
        }
    }
    //Update
    async updateUserInfo(id, user) {
        try {
            await this.userModel.findByIdAndUpdate(id, user, this.withOptionalSession({}));
        }
        catch (error) {
            let knownError = error;
            throw new DBError(knownError.message);
        }
    }
    async updateUserName(id, name) {
        try {
            await this.userModel.findByIdAndUpdate(id, { username: name }, this.withOptionalSession({}));
        }
        catch (error) {
            let knownError = error;
            throw new DBError(knownError.message);
        }
    }
    async updateUserEmail(id, email) {
        try {
            await this.userModel.findByIdAndUpdate(id, { email: email }, this.withOptionalSession({}));
        }
        catch (error) {
            let knownError = error;
            throw new DBError(knownError.message);
        }
    }
    async updateUserPassword(id, password) {
        try {
            await this.userModel.findByIdAndUpdate(id, { password: password }, this.withOptionalSession({}));
        }
        catch (error) {
            let knownError = error;
            throw new DBError(knownError.message);
        }
    }
    async updateUserDescription(id, description) {
        try {
            await this.userModel.findByIdAndUpdate(id, { description: description }, this.withOptionalSession({}));
        }
        catch (error) {
            let knownError = error;
            throw new DBError(knownError.message);
        }
    }
    async updateUserProfilePhoto(id, profilePhoto) {
        try {
            await this.userModel.findByIdAndUpdate(id, { profilePhotoURL: profilePhoto }, this.withOptionalSession({}));
        }
        catch (error) {
            let knownError = error;
            throw new DBError(knownError.message);
        }
    }
    //Delete
    async deleteUser(id) {
        try {
            await this.userModel.findByIdAndDelete(id, this.withOptionalSession({}));
        }
        catch (error) {
            let knownError = error;
            throw new DBError(knownError.message);
        }
    }
    async deleteContact(userID, contactID) {
        try {
            await this.userModel.findByIdAndUpdate(userID, { $pull: { contacts: contactID } });
        }
        catch (error) {
            let knownError = error;
            throw new DBError(knownError.message);
        }
    }
    async deleteManyContacts(userID, contactIDs) {
        try {
            await this.userModel.findByIdAndUpdate(userID, { $pull: { contacts: { $in: contactIDs } } });
        }
        catch (error) {
            let knownError = error;
            throw new DBError(knownError.message);
        }
    }
}
export { UserMongoDbModel };
