const mongoose = require('mongoose')
const { Schema } = mongoose;


const tagsSchema = new Schema({
    tagName: {
        type: String,
        required: true,
        trim: true,
        unique: true
    }
}, {
    timestamps: true
})

const tagsModel = mongoose.model('Tags', tagsSchema)
module.exports = tagsModel;