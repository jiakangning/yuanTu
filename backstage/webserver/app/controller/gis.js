const PositionManager = require('../service/gis/PositionManager')

exports.getAllPositions = (req, res, next) => {
  const positionManager = new PositionManager()
  positionManager.getAll((error, positions) => {
    if (error) {
      next(error)
    } else {
      res.json(positions)
    }
  })
}

exports.create = (req, res, next) => {
  const positionManager = new PositionManager()
  positionManager.create(req.body, (err, position) => {
    if (err) {
      next({ message: '保存失败', err })
    } else {
      res.json(position)
    }
  })
}

exports.update = (req, res, next) => {
  const positionManager = new PositionManager()
  positionManager.update(req.body, (err, position) => {
    if (err) {
      next({ message: '更新失败', err })
    } else {
      res.json(position)
    }
  })
}

exports.remove = (req, res, next) => {
  const positionManager = new PositionManager()
  positionManager.delete(req.body, (err, position) => {
    if (err) {
      next({ message: '删除失败', err })
    } else {
      res.json({ message: '删除成功', position })
    }
  })
}
