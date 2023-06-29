
const Brand = require('../models/Brand')

const create = async (req, res, next) => {
    try {
        let brand = await Brand.findOne({brandName: req.body.brandName})
        if(brand === null){
            brand = new Brand({brandName:req.body.brandName})
            await brand.save()
            res.status(200).json(brand)
            return 
        }
        res.status(400).json({message: 'Brand already exists on the system', exists : true})
    } catch (error) {
        console.log(error)
    }
}

const show = async (req, res, next) => {
    try {
        let brand = await Brand.find({})
        res.status(200).json(brand)
   } catch (error) {
    
   }
}

module.exports = {create, show}