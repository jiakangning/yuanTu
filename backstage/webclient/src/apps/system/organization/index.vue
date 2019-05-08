<template>
  <run-work :options='options'/>
</template>

<script>
  /**
   * @author zhang pan
   * @date 03-15-2019
   * @description 组织机构静态页面
   */
  import Run from 'run'
  import { system_department as DEPARTMENT, system_contact as CONTACT } from "@/store/action-types.js"
  const SEPARATOR = ','
  export default {
    data() {
      return {
        options: null,
        sources: new Run.Source()
      }
    },
    created() {
      this.options = new Run.Work({
        config: {
          title: '组织机构管理'
        },
        actions: ['create', 'update', 'delete', 'see'],
        list: {
          layout: 'treegrid',
          nodeOrder: "slIndex",
          columns: ['name', 'supervisor:select', 'inCharges:select', 'description', 'isValid']
        },
        search: ["name"],
        form: {
          rules: {
            name: true,
            supervisor: true,
            inCharges: true,
            telphone: true,
            slIndex: true
          },
          columns: ['parentId:select', 'name', 'supervisor:select', 'inCharges:select', 'telphone', 'address', 'slIndex', 'isValid', 'description:textarea']
        },
        columns: [
          { label: '部门名称', field: 'name', layout: 'text' },
          { label: '主管', field: 'supervisor', layout: 'text', source: 'supervisor' },
          { label: '分管', field: 'inCharges', layout: 'text', _multiple: true, source: 'supervisor' },
          { label: '描述', field: 'description', layout: 'text' },
          { label: '上级部门', field: 'parentId', layout: "treeselect", source: "menuTree", _changeOnSelect: true, _props: { label: "name", value: "id", children: "children" }},
          { label: '创建人', field: 'author', layout: 'text' },
          { label: '创建时间', field: 'createdAt', layout: 'date' },
          { label: '修改人', field: 'editor', layout: 'text' },
          { label: '最后修改时间', field: 'updatedAt', layout: 'text' },
          { label: "是否启用", field: "isValid", layout: "radio", source: "state" },
          { label: '电话', field: 'telphone', layout: 'text' },
          { label: '地址', field: 'address', layout: 'text' },
          { label: '上级部门id集合', field: 'rtPath', layout: 'text' },
          { label: '排序', field: 'slIndex', layout: 'text', _type: "number" }
        ],
        events: {
          loading: (store, done) => {
            const state = [
              { label: "启用", value: 1 },
              { label: "禁用", value: 2 }
            ]
            this.sources.set("state", state)
            done()
          },
          search: (params) => {
            const searchArr = [this.$store.dispatch(DEPARTMENT.search, params), this.$store.dispatch(CONTACT.search, params)]
            Promise.all(searchArr)
              .then(([department, contact]) => {
                // 分管(inCharges)为String类型，需转换为Array，且每个元素为Number类型,SEPARATOR表示逗号(,)
                const rows = department.rows.map(v => Object.assign(v, { inCharges: v.inCharges.split(SEPARATOR).map( n => Number(n) ) }))
                const supervisor = contact.rows.map(({name, id}) => ({ label: name, value: id}))
                this.sources.set({rows, count: department.count, 'menuTree': rows, supervisor})
              })
              .catch( err => console.log(err) )
          },
          delete: (rows, done) => {
            this.$store.dispatch(DEPARTMENT.delete, rows.map(v => v.id)).then(() => done()).catch(done)
          },
          submit: (form, done) => {
            // 创建人和修改人先默认为1，等后续功能完成再做 03-18-2019
            Object.assign(form, { author: 1, editor: 1, inCharges: form.inCharges.join(SEPARATOR) })
            const action = !form.id ? DEPARTMENT.create : DEPARTMENT.update
            this.$store.dispatch(action, form).then(() => done()).catch(done)
          },
          create: (form, store) => {
            let row = this.menuOptions.getList().row
            row && store.setForm({ parentId: row.id })
            this.sources.build("menuTree", this.sources.get("rows"))
          },
          update: (form) => {
            this.sources.build("menuTree", this.sources.get("rows"), { exclude: form.id })
          }
        },
        sources: this.sources
      })
    },
    methods: {
      getData (format) {
        axios.get()
      }
    }
  }
</script>
