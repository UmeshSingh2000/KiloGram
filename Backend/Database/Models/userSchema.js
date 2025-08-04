const mongoose = require('mongoose');
const { Schema } = mongoose;

const emailRegex = /^\S+@\S+\.\S+$/;
const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is Required'],
        trim: true,
        minlength: [2, 'Name must be at least 2 characters'],
        maxlength: [50, 'Name must be at most 50 characters']
    },
    userName: {
        type: String,
        unique: true,
        trim: true,
        required: [true, 'Username is Required'],
        match: [/^[a-zA-Z0-9_.]+$/, 'Username must be alphanumeric with underscores or dots only']
    },
    bio: {
        type: String,
        trim: true,
        maxlength: [150, 'Bio cannot exceed 150 characters'],
        default: ''
    },
    profilePicture: {
        type: String,
        default: ''
    },
    profilePicturePublicId: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        trim: true,
        minlength: [6, 'Password must be at least 6 Character long'],
        required: [true, 'Password is Required']
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, 'Email is Required'],
        trim: true,
        match: [emailRegex, 'Please provide a valid email address']
    },
    followers: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    followings: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    noOfPosts: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})

const userModel = mongoose.model('User', userSchema)
module.exports = userModel