const express = require('express')
const router = express.Router()

const { create, show } = require('../controllers/brandController')

router.get('/', show)
router.post('/create', create)
    
module.exports = router