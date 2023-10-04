const express = require('express')
const router = express.Router()
const passport = require('passport')
const passportConfig = require('../middleware/passport')
const { create, show , test} = require('../controllers/brandController')

router.get('/', show)
router.post('/create', passport.authenticate('jwt', { session: false }), create)
router.post('/test', test)

module.exports = router