import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        minlength: [3, 'Name must be at least 3 characters long']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
            message: 'Please enter a valid email address'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Password must be at least 6 characters long'],
        select: false
    },
    phone: {
        type: String,
        required: true,
        validate: {
            validator: phone => /^\d{10}$/.test(phone),
            message: 'Please enter a valid phone number'
        }
    },
    aboutMe: {
        type: String,
        required: true,
        minlength: [5, 'About me must be at least 5 characters long']
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        }, 
        url: {
            type: String,
            required: true
        }
    },
    resume: {
        public_id: {
            type: String,
            required: true
        }, 
        url: {
            type: String,
            required: true
        }
    },
    portfolioURL: {
        type: String,
        required: true
    },
    githubURL: String,
    linkedInURL: String,
    facebookURL: String,
    instagramURL: String,
    twitterURL: String,
    resetPasswordToken: String,
    resetPasswordExpire: Date
})

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
})

userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.methods.generateJsonWebToken = function() {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, { 
        expiresIn: process.env.JWT_EXPIRES
    });
}

userSchema.methods.getResetPasswordToken = function() {
    const resetToken = crypto.randomBytes(20).toString('hex');
    this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    return resetToken;
}

export const User = mongoose.model('User', userSchema);