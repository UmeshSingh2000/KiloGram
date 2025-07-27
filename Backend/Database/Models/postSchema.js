const mongoose = require('mongoose')
const { Schema } = mongoose;

const postSchema = new Schema({
    postedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    image: [{
        type: String,
        required: true,
    }],
    content: {
        type: String,
        required: true,
        maxlength: 3000
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
module.exports = postModel