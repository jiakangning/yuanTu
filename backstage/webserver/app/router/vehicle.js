const express = require('express')
const { undergrounds } = require('../controller/vehicle')

const router = express.Router()

router.get('/location/vehicles', undergrounds)

module.exports = router
