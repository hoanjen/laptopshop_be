const express = require('express')
const router = express.Router()

const {signup, signin, refreshToken} = require('../controllers/userController')

router.post('/signup', signup)
router.post('/signin', signin)
router.post('/refreshToken', refreshToken)

module.exports = router