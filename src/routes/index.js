
const productRouter= require('./product')
const brandRouter= require('./brand')
const userRouter= require('./user')
const cartRouter= require('./cart')

function route(app) {
    app.use('/product', productRouter)
    app.use('/brand', brandRouter)
    app.use('/user', userRouter)
    app.use('/cart', cartRouter)
}

module.exports = route