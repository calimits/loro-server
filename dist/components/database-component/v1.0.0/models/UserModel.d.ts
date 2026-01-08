import mongoose from 'mongoose';
import { User } from '../../../../types/UserTypes.js';
declare const User: mongoose.Model<User, {}, {}, {}, mongoose.Document<unknown, {}, User> & User & Required<{
    _id: string;
}> & {
    __v: number;
}, any>;
export { User };
