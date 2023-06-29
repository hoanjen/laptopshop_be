const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Refresh = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId,ref: 'User', require: true },
    refreshToken: {type: String, require: true}
})

module.exports = mongoose.model('Refresh', Refresh)