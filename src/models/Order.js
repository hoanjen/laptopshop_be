const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Order = new Schema({
    user: {type: mongoose.Schema.Types.ObjectId,ref: 'User' , require: true},
    name: {type: String, require: true},
    phone: {type: Number, require: true},
    cancel: {type: Boolean, require: true},
    title: {type: String , require: true}
},{
    timestamps: true
})

module.exports = mongoose.model('Order', Order)