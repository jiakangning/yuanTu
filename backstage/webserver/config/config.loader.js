exports.load = () => {
  if (process.env.NODE_ENV === 'production') {
    return require('./config.prod')
  } else if (process.env.NODE_ENV === 'test') {
    return require('./config.test')
  }
  return require('./config.default')
}
