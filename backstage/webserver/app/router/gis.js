const express = require('express')
const { getAllPositions, create, update, remove } = require('../controller/gis')

const router = express.Router()

router.get('/all', getAllPositions)

router
  .route('/')
  .post(create)
  .put(update)
  .delete(remove)

module.exports = router
