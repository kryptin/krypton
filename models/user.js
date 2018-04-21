import mongoose, {Schema} from 'mongoose';
import {hashSync, compareSync} from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';

import constants from '../config/constants'


var userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
    },
    created_at: Date,
    updated_at: Date
});


userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        this.password = this._hashPassword(this.password);
        return next();
    }
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at)
        this.created_at = currentDate;

    next();
});

userSchema.methods = {
    _hashPassword(password) {
        return hashSync(password);
    },
    authenticateUser(password) {
        return compareSync(password, this.password);
    },
    createToken() {
        return jwt.sign(
            {
                _id: this._id
            },
            constants.JWT_SECRET
        )
    }
};

export default mongoose.model('User', userSchema);
