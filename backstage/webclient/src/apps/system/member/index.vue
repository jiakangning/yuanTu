<template>
  <run-work :options="workOptions">
    <run-column
      position="list"
      label="状态"
      field="status">
      <el-tooltip
        v-if="scope"
        slot-scope="scope"
        :content="!scope.row.isLocked ? '正常使用' : '已禁用'"
        placement="top">
        <el-switch
          v-model="scope.row.isLocked"
          active-color="#67C23A"
          inactive-color="#ff4949"
          :active-value="false"
          :inactive-value="true"
          @change="onUpdate(scope.row)"/>
      </el-tooltip>
    </run-column>
    <run-column
      @confirm="onSet"
      :submit="true"
      position="layer"
      title="设置角色"
      :option="{ area: ['60%', '400px'] }"
      v-model="show">
      <run-list :options="roleListOptions"/>
    </run-column>
  </run-work>
</template>

<script type="text/jsx">
import Run from 'run'
import {
  system_member as MEMBER,
  system_job as JOB,
  system_role as ROLE,
  system_department as DEPARTMENT
} from '@/store/action-types.js'

/**
 * @author: 魏婷
 * @date: 2019-03-15
 * @description: 帐号管理
 */

// TODO: 缺少 http 请求接口为用户设置角色
// TODO: 输入真实姓名、井下电话查询不到数据
// TODO:

export default {
  name: 'member',
  data () {
    return {
      show: false,
      sources: new Run.Source(),
      workOptions: null,
      roleListOptions: null,
      currentSelectedAccounts: [],
      currentSelectedRoles: []
    }
  },
  created () {
    this.workOptions = new Run.Work({
      config: { title: '账户管理' },
      actions: [
        'create',
        'update',
        'delete',
        {
          text: '设置角色',
          type: 'primary',
          icon: 'runicon iconuser',
          click: ({ rows, select }) => {
            if (!select) return this.$message.error('请至少选中一行数据！')
            this.show = true
            this.currentSelectedAccounts = rows
          }
        }
      ],
      columns: [
        { label: '用户名', field: 'username', layout: 'text', cols: 12, rules: true },
        { label: '密码', field: 'password', layout: 'text', cols: 12 },
        { label: '真实姓名', field: 'name', layout: 'text', cols: 12, rules: true },
        { label: '组织机构', field: 'departmentId', layout: 'select', source: 'departments', cols: 12, _label: 'name', _value: 'id' },
        { label: '井下电话', field: 'downholePhone', layout: 'text', cols: 12 },
        { label: '职位', field: 'jobId', layout: 'select', source: 'jobs', cols: 12, _label: 'text', _value: 'id' },
        { label: '井上电话', field: 'privatePhone', layout: 'text', cols: 12, rules: true },
        { label: '住址', field: 'address', layout: 'text', cols: 12 },
        { label: '邮箱', field: 'email', layout: 'text', cols: 12, rules: 0 },
        { label: '备注', field: 'description', layout: 'textarea', cols: 12 },
        { label: '是否禁用', field: 'isLocked', layout: 'switch', cols: 24 },
        { label: '头像', field: 'photo', layout: 'textarea', cols: 24 },
        { label: '性别', field: 'sex', layout: 'text' },
        { label: '关键字', field: 'keywords', layout: 'text', _placeholder: '搜索用户名、真实姓名、井上电话、井下电话', width: '300px' }
      ],
      list: {
        serial: false,
        columns: [
          'username',
          'name',
          'sex',
          'email',
          'jobId',
          'downholePhone',
          'privatePhone',
          'departmentId:text'
        ]
      },
      form: [
        'username',
        'password',
        'name',
        'departmentId',
        'downholePhone',
        'jobId',
        'privatePhone',
        'address',
        'email',
        'description',
        'isLocked',
        'photo'
      ],
      search: {
        layout: 'multiple',
        columns: ['departmentId:select', 'keywords']
      },
      events: {
        loading: (store, done) => {
          this.$store.dispatch(JOB.search).then(res => this.sources.set('jobs', res.rows))
          this.$store.dispatch(ROLE.search).then(res => {
            this.sources.set('roles', res.rows)
            this.sources.set('rolesTotal', res.count)
          })
          this.$store.dispatch(DEPARTMENT.search).then(res => this.sources.set('departments', res.rows))
          done()
        },
        search: (params) => {
          this.$store.dispatch(MEMBER.search, params)
            .then(({ rows, count }) => {
              this.sources.set('rows', rows)
              this.sources.set('count', count)
            })
        },
        delete: (rows, done) => {
          this.$store.dispatch(MEMBER.delete, rows.map(v => v.id)).then(() => done()).catch(done)
        },
        submit: (form, done) => {
          const action = form.id ? MEMBER.update : MEMBER.create
          this.$store.dispatch(action, form).then(() => done()).catch(done)
        },
        update: (form, store) => store.setForm({ password: '' })
      },
      sources: this.sources
    })

    this.roleListOptions = new Run.List({
      config: {
        rows: 'roles',
        total: 'rolesTotal',
        pagination: false
      },
      columns: [
        { label: '名称', field: 'roleText', layout: 'text' },
        { label: '说明', field: 'description', layout: 'text' }
      ],
      sources: this.sources
    })
  },
  methods: {
    onSet (done) {
      this.currentSelectedRoles = this.roleListOptions.getSelection()
      let roleIds = this.currentSelectedRoles.map(v => v.id)
      let accountIds = this.currentSelectedAccounts.map(v => v.id)
      if (roleIds.length === 0) {
        done(new Error('请至少添加一个角色！'))
        return this.$message.error('请至少添加一个角色！')
      }
      this.$store.dispatch(MEMBER.setRole, { roleIds, accountIds }).then(() => done()).catch(done)
    },
    onUpdate (row) {
      this.$store.dispatch(MEMBER.update, row)
        .then(() => this.$message.success('操作成功！'))
        .catch(() => this.$message.error('操作失败！'))
    }
  }
}
</script>
