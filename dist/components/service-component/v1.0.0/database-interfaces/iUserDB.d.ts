import { UserAuth, UserPublicProfile, UserPrivateProfile } from "../../../../types/UserTypes.js";
interface iUserDB {
    createUser(user: UserPrivateProfile): Promise<void>;
    createManyUsers(users: UserPrivateProfile[]): Promise<void>;
    createContact(userID: string, contactID: String): Promise<void>;
    readUserForAuth(name: string): Promise<UserAuth>;
    readUserByID(id: string): Promise<UserPublicProfile>;
    readUserByEmail(email: string): Promise<UserPublicProfile>;
    readUserByName(name: string): Promise<UserPublicProfile>;
    readManyUsersByID(ids: string[]): Promise<UserPublicProfile[]>;
    readManyUsersByEmail(emails: string[]): Promise<UserPublicProfile[]>;
    readManyUsersByName(names: string[]): Promise<UserPublicProfile[]>;
    readAllUsers(start: number, limit: number): Promise<UserPublicProfile[]>;
    readContacts(userID: string, start: number, limit: number): Promise<string[]>;
    updateUserInfo(id: string, user: UserPrivateProfile): Promise<void>;
    updateUserName(id: string, name: string): Promise<void>;
    updateUserEmail(id: string, email: string): Promise<void>;
    updateUserPassword(id: string, password: string): Promise<void>;
    updateUserDescription(id: string, description: string): Promise<void>;
    updateUserProfilePhoto(id: string, profilePhoto: string): Promise<void>;
    deleteUser(id: string): Promise<void>;
    deleteContact(userID: string, contactID: string): Promise<void>;
    deleteManyContacts(userID: string, contactIDs: string[]): Promise<void>;
}
export { iUserDB };
