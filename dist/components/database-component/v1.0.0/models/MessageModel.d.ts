import mongoose from "mongoose";
import { Message } from "../../../../types/MessageTypes.js";
declare const Message: mongoose.Model<Message, {}, {}, {}, mongoose.Document<unknown, {}, Message> & Message & Required<{
    _id: string;
}> & {
    __v: number;
}, any>;
export { Message };
