import { Router } from "express";
import { auth } from "../../../middleware-component/v1.0.0/AuthMiddlewareInstance.js";
import { upload } from "../../../middleware-component/v1.0.0/multer.js";
export function getUserServiceRouter(userServiceController) {
    const UserServiceRoutes = Router();
    const uc = userServiceController.getRoutes();
    const am = auth.getMiddleware();
    //get
    UserServiceRoutes.get("/users", uc.getAllUsers); //get all users
    UserServiceRoutes.get("/users/:id", uc.getUserByID); //get one user by id
    UserServiceRoutes.get("/users/name/:name", uc.getUserByName); //get one user by name
    UserServiceRoutes.get("/users/contacts/:userID", am.auth, uc.getUserContacts); //get one user contacts
    //post
    UserServiceRoutes.post("/users/ids", uc.getManyUsersByID); //get many users by id
    UserServiceRoutes.post("/users/sign-in", uc.signIn); //sign in one user
    UserServiceRoutes.post("/users/refresh-tokens", uc.refreshTokens); //sign in one user
    UserServiceRoutes.post("/users/sign-up", uc.signUp); //sign up one user
    UserServiceRoutes.post("/users/logout", uc.logout); //logout one user
    UserServiceRoutes.post("/users/add-contact/:userID", am.auth, uc.addContact2User); //add contact for one user
    //put
    UserServiceRoutes.put("/users/update/name/:userID", am.auth, uc.updateUserName); //update one user field 
    UserServiceRoutes.put("/users/update/description/:userID", am.auth, uc.updateUserDescription); //update one user field 
    UserServiceRoutes.put("/users/update/email/:userID", am.auth, uc.updateUserEmail); //update one user field 
    UserServiceRoutes.put("/users/update/profile-photo/:userID", am.auth, upload.single("file"), uc.updateUserProfilePhoto); //update one user field 
    UserServiceRoutes.put("/users/update/password/:username", am.auth, uc.updateUserPassword); //update one user field 
    //delete
    UserServiceRoutes.delete("/users/:userID", am.auth, uc.deleteUser); //delete one user
    UserServiceRoutes.delete("/users/contacts/:userID/:contactID", am.auth, uc.deleteContactFromUser); //delete one contact of a user
    UserServiceRoutes.delete("/users/contacts/:userID", am.auth, uc.deleteManyContactsFromUser); //delete many contact of a user
    return UserServiceRoutes;
}
