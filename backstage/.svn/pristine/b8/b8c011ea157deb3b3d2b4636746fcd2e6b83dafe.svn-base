module.exports = {
  devServer: {
    proxy: {
      '/webserver': {
        target: 'http://39.153.160.229:9527/',
        changeOrigin: true,
        pathRewrite: {
          '^/webserver': '/'
        }
      },
      '/socket.io': {
        target: 'http://39.153.160.229:9527/',
        changeOrigin: true
      },
      '/chart': {
        target: 'http://172.16.11.90:8866/',
        changeOrigin: true,
        pathRewrite: {
          '^/chart': '/'
        }
      }
    }
  }
}