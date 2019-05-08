<template>
  <run-work :options='options'>
      <run-column
        position='form'
        after='description'>
            <el-form-item label='字典项值'>
                <run-work :options='dictItem' ></run-work>
            </el-form-item>
        </run-column>
  </run-work>
</template>

<script>
/**
 * @author zhang pan
 * @date 03-20-2019
 * @description 字典项管理
 */
import Run from 'run';
import { system_dictionary as DICT } from "@/store/action-types.js";
export default {
  data() {
    return {
      options: null,
      dictItem: null,
      relationOptions: null,
      sources: new Run.Source(),
    };
  },
  created() {
    this.options = new Run.Work({
      config: {
        title: '字典项管理'
      },
      actions: ['create', 'update', 'delete', 'see'],
      list: {
        primaryField: "label",
        layout: "treegrid",
        columns: [ 'label', 'value', 'index' ],
      },
      form: [ 'parentId', 'label', 'value', 'index', 'description' ],
      columns: [
        { label: '字典项编号', field: 'value', layout: 'text', rules: true },
        { label: '字典项名称', field: 'label', layout: 'text', rules: true },
        { label: '排序', field: 'index', layout: 'text', _type: 'number' },
        { label: '字典项说明', field: 'description', layout: 'text' },
        { label: '上级字典项', field: 'parentId', layout: 'treeselect', source: "menuTree", _changeOnSelect: true, _props: { label: "label", value: "id", children: "children" } },
      ],
      events: {
        search: params => {
            this.$store.dispatch(DICT.search, params)
              .then(({ rows, count }) => {
                this.sources.set({rows, 'menuTree': rows, count})
              })
              .catch( err => console.log(err) );
        },
        delete: (rows, done) => {
          this.$store.dispatch(DICT.delete, rows.map(v => v.id)).then(() => done()).catch(done);
        },
        submit: (form, done) => {
          const action = !form.id ? DICT.create : DICT.update;
          console.log(form)
          this.$store.dispatch(action, form).then(() => done()).catch(done);
        },
        create: (form, store) => {
            let row = this.options.getList().row;
            row && store.setForm({ parentId: row.id });
            this.sources.build("menuTree", this.sources.get("rows"));
        },
        update: form => {
            this.sources.build("menuTree", this.sources.get("rows"), { exclude: form.id });
        }
      },
      sources: this.sources
    });
    this.dictItem = new Run.Work({
      actions: ['create', 'update', 'delete'],
      config: {
        layout: 'inline'
      },
      form: ['label', 'value', 'description'],
      list: {
        rows:'childrenRows',
        pagination: false,
        columns: ['label', 'value', 'description'],
      },
      columns: [
        { label: '名称', field: 'label', layout: 'text', rules: true },
        { label: '编号', field: 'value', layout: 'text', rules: true },
        { label: '描述', field: 'description', layout: 'text' },
      ],
      sources: this.sources,
    });
    this.relationOptions = new Run.Relation({
      parent: this.options,
      child: this.dictItem,
      field: 'children',
    });
  }
}
</script>
