const mongoose = require('mongoose')
const { Schema } = mongoose;


const tagsSchema = new Schema({
    tagName: {
        type: String,
        require: true
    }
}, {
    timestamps: true
})

const tagsModel = mongoose.model('Tags', tagsSchema)
module.exports = tagsModel;