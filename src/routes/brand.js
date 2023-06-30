const express = require('express')
const router = express.Router()

const { create, show , test} = require('../controllers/brandController')

router.get('/', show)
router.post('/create', create)
router.post('/test', test)

module.exports = router