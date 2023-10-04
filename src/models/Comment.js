const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Comment = new Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true},
    product: {type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true},
    content: {type: String}
}, {
    timestamps: true
});

module.exports = mongoose.model('Comment', Comment)