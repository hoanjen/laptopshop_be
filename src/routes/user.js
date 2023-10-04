const express = require('express')
const router = express.Router()
const passport = require('passport')
const passportConfig = require('../middleware/passport')
const {signup, signin, refreshToken} = require('../controllers/userController')


router.post('/signup', signup)
router.post('/signin', passport.authenticate('local', { session: false }), signin)
router.post('/refreshToken', refreshToken)

module.exports = router