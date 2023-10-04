const express = require('express')
const router = express.Router()
const passport = require('passport')
const passportConfig = require('../middleware/passport')

const { create, show ,test} = require('../controllers/orderController')

router.post('/create', passport.authenticate('jwt', { session: false }), create)
router.post('/test', passport.authenticate('jwt', { session: false }), test)
router.get('/show', show)

module.exports = router