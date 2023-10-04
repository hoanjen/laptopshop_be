const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const makeAccessToken = ( userId, isAdmin ) =>{
    let infor = {
        os: 'hoanjen-access',
        id: userId,
        isAdmin,
        date: new Date().getTime(),
    }
    let accessToken = jwt.sign(infor, process.env.secret, { expiresIn: '10h' })
    return accessToken
}

const makeRefreshToken = (userId, isAdmin) =>{
    let infor = {
        name: 'hoanjen-refresh',
        id: userId,
        isAdmin,
        date: new Date().getTime(),
    }
    let refreshToken = jwt.sign(infor, process.env.secret, { expiresIn: '100h' })
    return refreshToken
}

const signup = async (req, res, next) => {

    try {
        const check = await User.findOne({email: req.body.email})
        if(check !== null){
            return res.status(400).send({message: 'email already exists on the system', exists : true})
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        const newUser = {
            name : req.body.name,
            email: req.body.email,
            password: hashedPassword,
            address: req.body.address,
            phone: req.body.phone,
            isAdmin: req.body.isAdmin
        }
        
        const user = new User(newUser)
        await user.save()
        res.status(200).send(user)
        
    } catch (error) {
        next(error)
    }
}


const signin = async (req, res, next) => {
    try {
        const refreshToken = makeRefreshToken(req.user._id, req.user.isAdmin)
        const accessToken = makeAccessToken(req.user._id, req.user.isAdmin)
        return res.status(200).json({ accessToken, refreshToken })
    } catch (error) {
        next(error)
    }
}

const refreshToken = async (req, res, next) => {
    try {
        const refreshToken = req.body.refreshToken
        jwt.verify(refreshToken, process.env.secret, function(err, decoded) {
            if(err){
                console.log(err.name)
                res.status(400).json(err)
            }
            const accessToken = makeAccessToken(decoded._id)
            res.status(200).json({accessToken, refreshToken})
        })
    } catch (error) {
        
    }
}



module.exports = { signup , signin, refreshToken}