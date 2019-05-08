const express = require('express')
const { getAllStaffs, getAllVehicles } = require('../controller/location')

const router = express.Router()

router.get('/staffs', getAllStaffs)
router.get('/vehicles', getAllVehicles)

module.exports = router
