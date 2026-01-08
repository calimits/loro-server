import { ErrorController } from './ErrorController.js';
import { allowedImageMimeTypes } from '../../../constants/image-mime-types.js';
class UserServiceController {
    userService;
    constructor(userService) {
        this.userService = userService;
    }
    async getAllUsers(req, res) {
        try {
            let start = 0, limit = 50;
            if (req.query.start !== undefined)
                start = parseInt(req.query.start);
            if (req.query.limit !== undefined)
                limit = parseInt(req.query.limit);
            let users = await this.userService.getAllUsers(start, limit);
            res.status(200).json(users);
        }
        catch (error) {
            ErrorController.e404(req, res, error);
        }
    }
    async getUserByID(req, res) {
        try {
            const userID = req.params.id;
            let user = await this.userService.getUserByID(userID);
            res.status(200).json(user);
        }
        catch (error) {
            ErrorController.e404(req, res, error);
        }
    }
    async getManyUsersByID(req, res) {
        try {
            const userIDs = req.body.userIDs;
            let users = await this.userService.getManyUsersById(userIDs);
            res.status(200).json(users);
        }
        catch (error) {
            ErrorController.e404(req, res, error);
        }
    }
    async getUserByName(req, res) {
        try {
            let name = req.params.name;
            let user = await this.userService.getUserByName(name);
            res.status(200).json(user);
        }
        catch (error) {
            ErrorController.e404(req, res, error);
        }
    }
    async getUserContacts(req, res) {
        try {
            let start = 0, limit = 50;
            if (req.query.start !== undefined)
                start = parseInt(req.query.start);
            if (req.query.limit !== undefined)
                limit = parseInt(req.query.limit);
            const userID = req.params.userID;
            if (req.user?.id !== userID) {
                ErrorController.e401(req, res, new Error("ID doesn't match userID."));
                return;
            }
            const contacts = await this.userService.getUserContacts(userID, start, limit);
            const parsedContacts = [];
            contacts.forEach((contact, key) => parsedContacts.push({ username: key, id: String(contact) }));
            res.status(200).json(parsedContacts);
        }
        catch (error) {
            ErrorController.e404(req, res, error);
        }
    }
    async signIn(req, res) {
        try {
            const username = req.body.username;
            const password = req.body.password;
            const tokens = await this.userService.loginUser(username, password);
            res.cookie("refreshToken", tokens[0], {
                httpOnly: true,
                secure: false, //poner en true en production
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000
            });
            res.status(200).json(tokens[1]);
        }
        catch (error) {
            ErrorController.e500(req, res, error);
        }
    }
    async refreshTokens(req, res) {
        try {
            const refreshToken = req.cookies.refreshToken.token;
            let tokens = await this.userService.refreshUserTokens(refreshToken);
            res.cookie("refreshToken", tokens[0], {
                httpOnly: true,
                //secure: true
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000
            });
            res.status(200).json(tokens[1]);
        }
        catch (error) {
            ErrorController.e500(req, res, error);
        }
    }
    async logout(req, res) {
        try {
            const refreshToken = req.cookies.refreshToken.token;
            const userID = req.cookies.refreshToken.userID;
            await this.userService.logout(refreshToken, userID);
            res.clearCookie("refreshToken");
            res.status(200).json({ info: "Logout succesfully.", code: 200 });
        }
        catch (error) {
            ErrorController.e500(req, res, error);
        }
    }
    async signUp(req, res) {
        try {
            const username = req.body.username;
            const email = req.body.email;
            const password = req.body.password;
            await this.userService.registerUser(username, email, password);
            res.status(200).json({ info: "User created succesfully", code: 200 });
        }
        catch (error) {
            ErrorController.e500(req, res, error);
        }
    }
    async addContact2User(req, res) {
        try {
            const userID = req.body.userID;
            const contactName = req.body.contactName;
            if (req.user?.id !== userID) {
                ErrorController.e401(req, res, new Error("ID doesn't match userID."));
                return;
            }
            await this.userService.addContact2User(userID, contactName);
            res.status(200).json({ info: "Contact added succesfully", code: 200 });
        }
        catch (error) {
            ErrorController.e500(req, res, error);
        }
    }
    async updateUserName(req, res) {
        try {
            const userID = req.body.userID;
            const username = req.body.username;
            if (req.user?.id !== userID) {
                ErrorController.e401(req, res, new Error("ID doesn't match userID."));
                return;
            }
            await this.userService.updateUserName(userID, username);
            res.status(200).json({ info: "Username updated succesfully", code: 200 });
        }
        catch (error) {
            ErrorController.e500(req, res, error);
        }
    }
    async updateUserEmail(req, res) {
        try {
            const userID = req.body.userID;
            const email = req.body.email;
            if (req.user?.id !== userID) {
                ErrorController.e401(req, res, new Error("ID doesn't match userID."));
                return;
            }
            await this.userService.updateUserEmail(userID, email);
            res.status(200).json({ info: "Email updated succesfully", code: 200 });
        }
        catch (error) {
            ErrorController.e500(req, res, error);
        }
    }
    async updateUserDescription(req, res) {
        try {
            const userID = req.body.userID;
            const description = req.body.description;
            if (req.user?.id !== userID) {
                ErrorController.e401(req, res, new Error("ID doesn't match userID."));
                return;
            }
            await this.userService.updateUserDescription(userID, description);
            res.status(200).json({ info: "Description updated succesfully", code: 200 });
        }
        catch (error) {
            ErrorController.e500(req, res, error);
        }
    }
    async updateUserPassword(req, res) {
        try {
            const username = req.params.username;
            const newPassword = req.body.newPassword;
            const oldPassword = req.body.oldPassword;
            if (req.user?.username !== username) {
                ErrorController.e401(req, res, new Error("Username doesn't match username."));
                return;
            }
            await this.userService.updateUserPassword(username, newPassword, oldPassword);
            res.status(200).json({ info: "Password updated succesfully", code: 200 });
        }
        catch (error) {
            ErrorController.e500(req, res, error);
        }
    }
    async updateUserProfilePhoto(req, res) {
        try {
            if (!req.file)
                throw new Error("No file uploaded.");
            //validar si es imagen
            const isImage = allowedImageMimeTypes.some(mime => mime === req.file?.mimetype);
            if (!isImage)
                throw new Error("Image format not valid.");
            const userID = req.params.userID;
            if (req.user?.id !== userID) {
                ErrorController.e401(req, res, new Error("ID doesn't match userID."));
                return;
            }
            const photo = {
                originalName: req.file.originalname,
                size: req.file.size,
                mimeType: req.file.mimetype,
                buffer: req.file.buffer
            };
            await this.userService.updateUserProfilePhoto(userID, photo);
            res.status(200).json({ info: "Profile photo updated succesfully", code: 200 });
        }
        catch (error) {
            ErrorController.e500(req, res, error);
        }
    }
    async deleteUser(req, res) {
        try {
            const userID = req.params.userID;
            const refreshToken = req.cookies.refreshToken.token;
            if (req.user?.id !== userID) {
                ErrorController.e401(req, res, new Error("ID doesn't match userID."));
                return;
            }
            await this.userService.logout(refreshToken, userID);
            await this.userService.deleteUser(userID);
            res.clearCookie("refreshToken");
            res.status(200).json({ info: "User deleted succesfully", code: 200 });
        }
        catch (error) {
            console.log(error);
            ErrorController.e500(req, res, error);
        }
    }
    async deleteContactFromUser(req, res) {
        try {
            const userID = req.params.userID;
            const contactID = req.params.contactID;
            if (req.user?.id !== userID) {
                ErrorController.e401(req, res, new Error("ID doesn't match userID."));
                return;
            }
            await this.userService.deleteContactOf1User(userID, contactID);
            res.status(200).json({ info: "Contact deleted succesfully", code: 200 });
        }
        catch (error) {
            ErrorController.e500(req, res, error);
        }
    }
    async deleteManyContactsFromUser(req, res) {
        try {
            const userID = req.params.userID;
            const contactIDs = req.body.contactIDs;
            if (req.user?.id !== userID) {
                ErrorController.e401(req, res, new Error("ID doesn't match userID."));
                return;
            }
            await this.userService.deleteManyContactsOf1User(userID, contactIDs);
            res.status(200).json({ info: "Contacts deleted succesfully", code: 200 });
        }
        catch (error) {
            ErrorController.e500(req, res, error);
        }
    }
    getRoutes() {
        return {
            getAllUsers: this.getAllUsers.bind(this),
            getUserByID: this.getUserByID.bind(this),
            getManyUsersByID: this.getManyUsersByID.bind(this),
            getUserByName: this.getUserByName.bind(this),
            getUserContacts: this.getUserContacts.bind(this),
            signIn: this.signIn.bind(this),
            refreshTokens: this.refreshTokens.bind(this),
            signUp: this.signUp.bind(this),
            logout: this.logout.bind(this),
            addContact2User: this.addContact2User.bind(this),
            updateUserName: this.updateUserName.bind(this),
            updateUserEmail: this.updateUserEmail.bind(this),
            updateUserDescription: this.updateUserDescription.bind(this),
            updateUserPassword: this.updateUserPassword.bind(this),
            updateUserProfilePhoto: this.updateUserProfilePhoto.bind(this),
            deleteUser: this.deleteUser.bind(this),
            deleteContactFromUser: this.deleteContactFromUser.bind(this),
            deleteManyContactsFromUser: this.deleteManyContactsFromUser.bind(this)
        };
    }
}
export { UserServiceController };
