const Order = require('../models/Order')
const OrderDetail = require('../models/OrderDetail')
const Cart = require('../models/Cart')
const User = require('../models/Cart')


const create = async (req, res, next) => {
    try {
        const cart = {
            user: req.body.user,
            product: req.body.product,
            quantity: req.body.quantity
        }
        const check = await Cart.findOne({
            user: req.body.user,
            product: req.body.product
        })

        let newCart
        if(check === null){
            newCart = new Cart(cart)
            await newCart.save()
        }else{
            check.quantity = check.quantity + parseInt(req.body.quantity,10)
            await check.save()
        }
        res.status(201).json(check)
    } catch (error) {
        console.log(error)
    }
}

module.exports = { create }