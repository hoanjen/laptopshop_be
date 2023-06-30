const Order = require('../models/Order')
const OrderDetail = require('../models/OrderDetail')
const Cart = require('../models/Cart')
const Product = require('../models/Product')
const User = require('../models/User')


const create = async (req, res, next) => {
    if(req.body.totalQuantity < 1){
        res.status(400).json({message : 'Cart cannot be empty'})
    }
    const cart = await Cart.find({user: req.body.id})
    const product = await Product.find({ _id: cart.product })
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

    const OrderDetail = product.map((pro) =>{
        pro.order = order._id
        
    })
    
    res.json(123)
}

module.exports = { create }