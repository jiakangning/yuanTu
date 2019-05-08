<template>
  <run-work :options="workOptions">
    <run-column
      position="layer"
      title="角色授权"
      :option="{ area: ['50%', '300px'] }"
      v-model="showAuth">
      <run-form :options="authOptions"></run-form>
    </run-column>
    <run-column
      position="layer"
      title="移动端角色授权"
      :option="{ area: ['50%', '300px'] }"
      v-model="showMobileAuth">
      <run-form :options="authMobileOptions"></run-form>
    </run-column>
  </run-work>
</template>

<script>
import Run from 'run'
import { system_role as ROLE } from '@/store/action-types.js'

/**
 * @author: 魏婷
 * @date: 2019-03-19
 * @description: 人员管理
 */

export default {
  name: 'role',
  data () {
    return {
      sources: new Run.Source(),
      workOptions: null,
      showAuth: false,
      showMobileAuth: false,
      authOptions: null,
      authMobileOptions: null,
      currentSelectedRoles: []
    }
  },
  computed: {
    currentRoleId () {
      return this.currentSelectedRoles[0].id
    },
    currentRoleText () {
      return this.currentSelectedRoles[0].roleText
    }
  },
  created () {
    this.workOptions = new Run.Work({
      sources: this.sources,
      config: {
        title: '角色管理'
      },
      actions: [
        'create',
        'update',
        'delete',
        {
          text: '授权',
          icon: 'runicon iconunlock',
          click: ({ rows, select }) => {
            if (!select || rows.length > 1) return this.$message.error('请选中一行数据！')
            this.showAuth = true
            this.currentSelectedRoles = rows
            this.$store.dispatch(ROLE.getFunsByRoleId, this.currentRoleId)
              .then(res => {
                let obj = {
                  roleId: this.currentRoleId,
                  roleText: this.currentRoleText,
                  menuIds: res
                }
                this.authOptions.initForm(obj)
              })
          }
        },
        {
          text: '移动端授权',
          icon: 'runicon iconmobile',
          click: ({ rows, select }) => {
            if (!select || rows.length > 1) return this.$message.error('请选中一行数据！')
            this.showMobileAuth = true
            this.currentSelectedRoles = rows
            this.$store.dispatch(ROLE.getMobileFunsByRoleId, this.currentRoleId)
              .then(res => {
                let obj = {
                  roleId: this.currentRoleId,
                  roleText: this.currentRoleText,
                  menuIds: res
                }
                this.authMobileOptions.initForm(obj)
              })
          }
        }
      ],
      columns: [
        { label: '角色名称', field: 'roleText', layout: 'text', rules: true },
        { label: '角色说明', field: 'description', layout: 'text' },
        { label: '创建时间', field: 'created_at', layout: 'date' },
        { label: '排序', field: 'pIndex', layout: 'number', tips: '常用或重要角色，可以通过排序编号靠前哦！' }
      ],
      list: ['roleText', 'description', 'created_at'],
      form: ['roleText', 'description', 'pIndex'],
      search: {
        layout: 'multiple',
        columns: ['roleText']
      },
      events: {
        loading: (store, done) => {
          this.$store.dispatch(ROLE.getFuns)
            .then(res => {
              this.sources.build('functions', res)
            })
          this.$store.dispatch(ROLE.getMobileFuns)
            .then(res => {
              this.sources.build('mobileFunctions', res)
            })
          done()
        },
        search: (params) => {
          this.$store.dispatch(ROLE.search, params)
            .then(res => {
              this.sources.set('rows', res.rows)
              this.sources.set('count', res.count)
            })
        },
        submit: (form, done) => {
          let action = form.id ? ROLE.update : ROLE.create
          this.$store.dispatch(action, form).then(() => done()).catch(done)
        },
        delete: (rows, done) => {
          this.$store.dispatch(ROLE.delete, rows.map(v => v.id)).then(() => done()).catch(done)
        }
      }
    })

    this.authOptions = new Run.Form({
      sources: this.sources,
      columns: [
        { label: '角色名称', field: 'roleText', layout: 'text', _disabled: true },
        { label: '角色授权', field: 'menuIds', layout: 'treeselect', source: 'functions', _multiple: true, _props: { value: 'id' } }
      ],
      events: {
        submit: (form, done) => {
          delete form.roleText
          this.$store.dispatch(ROLE.setAuth, form)
            .then(() => {
              done()
              this.showAuth = false
            })
            .catch(err => done('操作失败'))

        },
        cancel: () => this.showAuth = false
      }
    })

    this.authMobileOptions = new Run.Form({
      sources: this.sources,
      columns: [
        { label: '角色名称', field: 'roleText', layout: 'text', _disabled: true },
        { label: '角色授权', field: 'menuIds', layout: 'treeselect', source: 'mobileFunctions', _multiple: true, _props: { value: 'id', label: 'mobileText' } }
      ],
      events: {
        submit: (form, done) => {
          delete form.roleText
          this.$store.dispatch(ROLE.setMobileAuth, form)
            .then(() => {
              done()
              this.showMobileAuth = false
            })
            .catch(err => done('操作失败'))
        },
        cancel: () => this.showMobileAuth = false
      }
    })
  }
}
</script>

