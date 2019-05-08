<template>
  <run-work :options="options"/>
</template>

<script>
  /**
   * @update 赵赛赛
   * @date 2019-03-17
   * 新建页面
   */
  import Run from 'run'
  import Mock from 'mockjs'
  import { system_logLogin as logLogin } from '@/store/action-types.js'

  export default {
    data() {
      return {
        options: null,
        sources: new Run.Source()
      }
    },
    mounted() {
      this.options = new Run.Work({
        config: {
          title: '登录日志管理'
        },
        actions: ['delete'],
        tabs: 'tabs',
        list: [
          'account',
          'lTime',
          'isPass',
          'browser',
          'ip'
        ],
        form: [
          'account',
          'lTime',
          'isPass',
          'browser',
          'ip'
        ],
        search: {
          layout: 'multiple',
          columns: [
            'lTime',
            'account'
          ]
        },
        columns: [
          { label: '登陆账户', field: 'account', layout: 'text' },
          { label: '登陆时间', field: 'lTime', layout: 'date' },
          { label: '是否通过', field: 'isPass', layout: 'select', source: 'isPass' },
          { label: '浏览器', field: 'browser', layout: 'text' },
          { label: 'IP地址', field: 'ip', layout: 'text' }
        ],
        events: {
          loading: (store, done) => {
            const { isPass } = Mock.mock({
              'isPass|2': [{
                'label|+1': ['是', '否'],
                'value|+1': [true, false]
              }]
            })
            this.sources.set('isPass', isPass)
            done()
          },
          search: (params) => {
            this.$store.dispatch(logLogin.search, params)
              .then(({ rows, count }) => {
                this.sources.set('rows', rows)
                this.sources.set('count', count)
              })
          },
          delete: (rows, done) => {
            this.$store.dispatch(logLogin.delete, rows.map(v => v.id)).then(() => done()).catch(done)
          },
          submit: (form, done) => {

          }
        },
        sources: this.sources
      })
    }
  }
</script>

<style scoped>
</style>
