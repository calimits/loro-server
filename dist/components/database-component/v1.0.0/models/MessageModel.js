import mongoose, { Schema } from "mongoose";
const StatusVerificationSchema = new Schema({
    receptorUserID: {
        type: String,
        required: true
    },
    isRecieved: {
        type: Boolean,
        default: false
    },
    isRead: {
        type: Boolean,
        default: false
    }
});
const MessageSchema = new Schema({
    type: {
        type: String,
        enum: ['audio', 'photo', 'text', 'video', 'document'],
        required: true
    },
    content: {
        type: String,
        required: true
    },
    chat_id: {
        type: String,
        required: true
    },
    emisorUserID: {
        type: String,
        required: true
    },
    messageVerificationStatus: [StatusVerificationSchema],
    dateTime: {
        type: Date,
        required: true
    }
});
const Message = mongoose.model("Message", MessageSchema);
export { Message };
