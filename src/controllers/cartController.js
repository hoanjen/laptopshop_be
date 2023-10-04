const Order = require('../models/Order')
const OrderDetail = require('../models/OrderDetail')
const Cart = require('../models/Cart')
const User = require('../models/Cart')



const show = async (req, res, next) => {
    try {
        const cart = await Cart.find({ user: req.query.id})
        res.status(200).json(cart)
    } catch (error) {
        console.log(error)
    }
}

const create = async (req, res, next) => {
    console.log(req)
    try {
        const cart = {
            user: req.user._id,
            product: req.body.product,
            quantity: req.body.quantity
        }
        let check = await Cart.findOne({
            user: req.user._id,
            product: req.body.product
        })

        if(check === null){
            check = new Cart(cart)
            await check.save()
        }else{
            check.quantity = check.quantity + parseInt(req.body.quantity,10)
            await check.save()
        }
        res.status(201).json(check)
    } catch (error) {
        console.log(error)
    }
}

module.exports = { create, show }