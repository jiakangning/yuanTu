exports.load = () => {
  const config = require('../../config/config.loader').load()
  return require(`./${config.localization}`)
}
