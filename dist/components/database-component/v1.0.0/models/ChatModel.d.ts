import mongoose from "mongoose";
import { Chat } from "../../../../types/ChatTypes.js";
declare const Chat: mongoose.Model<Chat, {}, {}, {}, mongoose.Document<unknown, {}, Chat> & Chat & Required<{
    _id: String;
}> & {
    __v: number;
}, any>;
export { Chat };
