const Order = require('../models/Order')
const OrderDetail = require('../models/OrderDetail')
const Cart = require('../models/Cart')
const User = require('../models/User')


const show = async (req,res, next) => {
    try {
        const order = await find({user: req.param.id})
        res.status(200).json(order)
    } catch (error) {
        console.log(error)
    }
}
const test = async (req, res, next) => {
    console.log(req.user)
}
const create = async (req, res, next) => {
    try {
        if(req.body.totalQuantity < 1){
                res.status(400).json({message : 'Cart cannot be empty'})
            }
        const cart = await Cart.find({user: req.body.id})
        const user = await User.findById(req.body.id)
        const newOrder = {
            user: user._id,
            name: user.name,
            phone: user.phone,
            cancel: false,
            title: req.body.title
            }
        const order = new Order(newOrder)
        await order.save()
        const orderDetail = cart.map((cart) => ({   
            order : order._id,
            product: cart.product,
            quantity: cart.quantity
        }))
        const newOrderDetail = await OrderDetail.insertMany(orderDetail)
        await Cart.deleteMany({ user: req.body.id })
        res.status(201).json(newOrderDetail)
    } catch (error) {
        console.log(error)
    }    
}



module.exports = { create, show, test }