const cloudinary = require('cloudinary').v2
const CLOUDINARY_URL = process.env.CLOUDINARY_URL
cloudinary.config().CLOUDINARY_URL
const multer = require('multer')
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    allowedFormats:['jpg','png'],
    params: {
        folder: 'laptopshop',
    }
})


const uploadCloud = multer({ storage })


module.exports = { uploadCloud }