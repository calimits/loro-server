import mongoose, { Schema } from 'mongoose';
const TokenSchema = new Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    userID: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: ['access', 'refresh'],
    }
});
const Token = mongoose.model('Token', TokenSchema);
export { Token };
