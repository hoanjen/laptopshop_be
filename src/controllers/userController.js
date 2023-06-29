const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Refresh = require('../models/Refresh')

const makeAccessToken = ( userId ) =>{
    let infor = {
        os: 'hoanjen-access',
        system: 'laptopshop',
        id: userId,
        date: new Date().getTime(),
    }
    let accessToken = jwt.sign(infor, process.env.secret, { expiresIn: '10h' })
    return accessToken
}

const makeRefreshToken = ( userId ) =>{
    let infor = {
        name: 'hoanjen-refresh',
        system: 'laptopshop',
        id: userId,
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
            address: req.body.address
        }
        
        const user = new User(newUser)
        await user.save()
        const refreshToken = makeRefreshToken(user._id)
        refresh = new Refresh({
            user: user._id,
            refreshToken
        })
        await refresh.save()
        res.status(200).send(user)
        
    } catch (error) {
        next(error)
    }
}


const signin = async (req, res, next) => {
    try {
        const user = await User.findOne({email: req.body.email})
        if(user === null){
            return res.status(400).json({message: 'Incorrect account or password'})
        }
        
        const check = await bcrypt.compare(req.body.password, user.password)
        if(check){
            const refresh = await Refresh.findOne({user: user._id})
            let refreshToken = refresh.refreshToken
            const accessToken = makeAccessToken(user._id)
            jwt.verify(accessToken, process.env.secret, function(err, decoded) {
                if(err){
                    console.log(err.name)
                }    
            })
            return res.status(200).json({accessToken, refreshToken})
        }
        else{
            return res.status(400).json({message: 'Incorrect account or password'})
        }
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