
const productRouter= require('./product')
const brandRouter= require('./brand')
const userRouter= require('./user')
const cartRouter= require('./cart')
const orderRouter= require('./order')


function route(app) {
    app.use('/product', productRouter)
    app.use('/brand', brandRouter)
    app.use('/user', userRouter)
    app.use('/cart', cartRouter)
    app.use('/order', orderRouter)
}

module.exports = route