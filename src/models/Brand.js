const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Brand = new Schema({
    brandName: {type: String, require: true}
}, {
    timestamps: true
});

module.exports = mongoose.model('Brand', Brand)