const express = require('express')
const router = express.Router()

const {show, create} = require('../controllers/productController')

router.get('/', show)
router.post('/create', create)

module.exports = router