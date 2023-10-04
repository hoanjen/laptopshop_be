const mongoose = require('mongoose')
const Schema = mongoose.Schema
const slug = require('mongoose-slug-generator')


const Product = new Schema({
    brand: { type: mongoose.Schema.Types.ObjectId,ref: 'Brand', require: true },
    name: { type: String, require: true },
    npp: { type: String, require: true },
    cpu: { type: String, require: true },
    ram: { type: String, require: true },
    hardDrive: { type: String, require: true },
    vga: { type: String, require: true },
    display: { type: String, require: true },
    pin: { type: String, require: true },
    weighteight: { type: String, require: true },
    color: { type: String, require: true },
    os: { type: String, require: true },
    warranty: { type: String, require: true },
    slug: { type: String, slug: 'name' }
}, {
    timestamps: true
});

mongoose.plugin(slug)

module.exports = mongoose.model('Product', Product)