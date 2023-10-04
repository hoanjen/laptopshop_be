const express = require('express')
const router = express.Router()
const passport = require('passport')
const passportConfig = require('../middleware/passport')
const {show, create} = require('../controllers/productController')
const { uploadCloud } = require('../utils/handlerUpload')


router.get('/', show)
router.post('/create', passport.authenticate('jwt', { session: false }), uploadCloud.array('files'), create)


module.exports = router