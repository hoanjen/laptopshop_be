const express = require('express')
const router = express.Router()

const { create, show } = require('../controllers/cartController')

router.post('/create', create)
router.get('/show', show)

module.exports = router