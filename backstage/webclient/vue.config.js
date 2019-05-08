const path = require('path')

module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3721',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('run', path.join(__dirname, 'src', 'run', 'index.js'))
  }
}
