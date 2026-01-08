import mongoose from 'mongoose';
import { Token } from '../../../../types/TokenTypes.js';
declare const Token: mongoose.Model<Token, {}, {}, {}, mongoose.Document<unknown, {}, Token> & Token & Required<{
    _id: string;
}> & {
    __v: number;
}, any>;
export { Token };
