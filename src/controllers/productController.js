
const Brand = require('../models/Brand')
const Product = require('../models/Product')
const ProductMedia = require('../models/ProductMedia')



const show = async (req, res, next) => {
    try {
        let product = await Product.find({})
        res.status(200).json(product)
    } catch (error) {

    }
 }

 const create = async (req, res, next) => {
    try {
        let brand = await Brand.findOne({brandName: req.body.brandName})
        if(brand === null){
            brand = new Brand({brandName:req.body.brandName})
            await brand.save()
        }
        const product = {
            brand: brand._id,
            ...req.body
        }
        delete product.brandName
        
        let newProduct = new Product(product)
    
        await newProduct.save()
        const tmp = req.files
        console.log(tmp)
        for (let i = 0; i < tmp.length; i++){
            const media = {
                product: newProduct._id,
                type: tmp[i].mimetype,
                url: tmp[i].path
            }
            const newMedia = new ProductMedia(media)
            await newMedia.save()
        }
        res.status(201).json(newProduct)
    } catch (error) {
        console.log(error)
    }
 }



module.exports = { show, create }
