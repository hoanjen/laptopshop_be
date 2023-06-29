
const Brand = require('../models/Brand')
const Product = require('../models/Product')


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
            ...req.body.product
        }
        let newProduct = new Product(product)
        await newProduct.save()
        res.status(201).json(newProduct)
    } catch (error) {
        console.log(error)
    }
 }



module.exports = { show, create }
