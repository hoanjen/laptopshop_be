const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductMedia = new Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', require: true },
    type: {type: String, require: true},
    url: { type: String, require: true }
}, {
    timestamps: true
})

module.exports = mongoose.model('ProductMedia', ProductMedia)