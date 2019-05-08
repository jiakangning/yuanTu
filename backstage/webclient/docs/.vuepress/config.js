const path = require('path')

module.exports = {
  title: 'Run',
  description: '基于 vue.js 开发的一套高效的 UI 组件',
  head: [
    ['link', { rel: 'icon', href: `/running.png` }]
  ],
  themeConfig: {
    nav: [
      { text: '开发指南', link: '/run/' }
    ],
    sidebar: {
      '/run/': [
        'chart',
        'chartWidge',
        'chartCard',
        'popupSearch',
        'work',
        'list',
        'form',
        'layer',
        'search',
        'cascader',
        'column',
        'option',
        'select'
      ]
    }
  },
  configureWebpack () {
    return {
      resolve: {
        alias: {
          'run': path.resolve(__dirname, '..', '..', 'src', 'run', 'index.js')
        }
      }
    }
  }
}
