const mongoose = require('mongoose')
const { Schema } = mongoose;

const postSchema = new Schema({
    postedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    likes: {
        type: Number,
        default: 0
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    image: [{
        type: String,
        required: true,
    }],
    content: {
        type: String,
        required: true,
    },
    tags: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Tags'
        }
    ]
}, {
    timestamps: true
})

const postModel = mongoose.model('Post', postSchema)
module.exports = postMode