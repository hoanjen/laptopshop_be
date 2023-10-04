const express = require('express')
const router = express.Router()
const passport = require('passport')
const passportConfig = require('../middleware/passport')
const { create, show } = require('../controllers/cartController')

router.post('/create', passport.authenticate('jwt', { session: false }), create)
router.get('/show', show)

module.exports = router