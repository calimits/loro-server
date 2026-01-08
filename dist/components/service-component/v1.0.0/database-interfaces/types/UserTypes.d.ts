interface User {
    _id: string;
    username: string;
    email: string;
    password: string;
    profilePhotoURL: string;
    description: string;
    contacts: string[];
}
interface UserPublicProfile extends Pick<User, "_id" | "description" | "profilePhotoURL" | "email" | "username"> {
}
interface UserPrivateProfile extends Pick<User, "password" | "description" | "profilePhotoURL" | "email" | "username" | "contacts"> {
}
interface UserAuth extends Pick<User, "password" | "email" | "username" | "_id"> {
}
export { User, UserPrivateProfile, UserPublicProfile, UserAuth };
