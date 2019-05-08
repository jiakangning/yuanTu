const path = require('path')
const fs = require('fs')
const morgan = require('morgan')
const FileStreamRotator = require('file-stream-rotator')
const config = require('./config.loader').load()

module.exports = (dir) => {
  const pathname = path.join(__dirname, '..', dir)
  fs.existsSync(pathname) || fs.mkdirSync(pathname)
  return morgan(
    config.logger.mode,
    { stream: FileStreamRotator.getStream(
      {
        date_format: 'YYYYMMDD',
        filename: pathname + '/%DATE%.log',
        frequency: 'daily',
        verbose: false
      })
    })
}