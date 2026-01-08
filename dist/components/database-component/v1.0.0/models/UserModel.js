import mongoose, { Schema } from 'mongoose';
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 30
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Por favor ingresa un email válido']
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    profilePhotoURL: {
        type: String,
        default: 'https://example.com/default-avatar.jpg'
    },
    description: {
        type: String,
        default: '',
        maxlength: 200
    },
    contacts: [String]
});
const User = mongoose.model('User', UserSchema);
export { User };
