const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrderDetail = new Schema({
    order: {type: mongoose.Schema.Types.ObjectId,ref: 'User' , require: true},
    product: {type: mongoose.Schema.Types.ObjectId,ref: 'Product' , require: true},
    quantity: {type: Number, require: true}
},{
    timestamps: true
})

module.exports = mongoose.model('OrderDetail', OrderDetail)