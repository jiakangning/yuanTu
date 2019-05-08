const express = require('express')
const { compose, calcLocation, createPath, getLastestInfo, getHitoryPath, getHistoryMile } = require('../controller/space')

const router = express.Router()

router.get('/schema', compose)
router.post('/location', calcLocation)
router.post('/createPath', createPath)
router.post('/getLastestInfo', getLastestInfo)
router.post('/getHitoryPath', getHitoryPath)
router.post('/getHistoryMile', getHistoryMile)
module.exports = router
