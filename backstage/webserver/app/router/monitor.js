const express = require('express')
const {
  getAllDrainages,
  getAllMainCoalFlow,
  getAllSafty,
  getAllMinePressures,
  getAllMainFan,
  getAllAlarms,
  equipments
} = require('../controller/monitor')

const router = express.Router()
router.get('/drainages', getAllDrainages)
router.get('/main-coal-flows', getAllMainCoalFlow)
router.get('/safties', getAllSafty)
router.get('/mine-pressures', getAllMinePressures)
router.get('/main-fans', getAllMainFan)
router.get('/alarm', getAllAlarms)
router.get('/equipments', equipments)

module.exports = router
