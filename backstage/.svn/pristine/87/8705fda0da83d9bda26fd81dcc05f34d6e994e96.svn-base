const express = require('express')
const { signup, update, postLogin } = require('../controller/auth')

const router = express.Router()

router.post('/login', postLogin)

router.post('/signup', signup)

router.post('/update', update)

module.exports = router
