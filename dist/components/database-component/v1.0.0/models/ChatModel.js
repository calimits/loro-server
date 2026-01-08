import mongoose, { Schema } from "mongoose";
const ChatUserSchema = new Schema({
    userID: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    hasArchivedThisChat: {
        type: Boolean,
        default: false
    }
});
const ChatSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    lastUpdated: {
        type: Date,
        required: true
    },
    chatUsers: [ChatUserSchema]
});
const Chat = mongoose.model('Chat', ChatSchema);
export { Chat };
