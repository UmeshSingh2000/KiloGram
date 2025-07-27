const mongoose = require('mongoose')
const { Schema } = mongoose

const commentSchema = new Schema({
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    text: { type: String, required: true },
    postedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    parentComment: { type: Schema.Types.ObjectId, ref: 'Comment', default: null } // for handling reply
}, {
    timestamps: true
})

const commmentModel = mongoose.model('Comment', commentSchema)
module.exports = commmentModel