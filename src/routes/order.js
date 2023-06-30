const express = require('express')
const router = express.Router()

const { create } = require('../controllers/orderController')

router.post('/create', create)

module.exports = router