const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentMedia = new Schema({
    comment: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', require: true },
    type: { type: String, require: true },
    url: { type: String, require: true },
}, {
    timestamps: true
})

module.exports = mongoose.model('CommentMedia', CommentMedia)