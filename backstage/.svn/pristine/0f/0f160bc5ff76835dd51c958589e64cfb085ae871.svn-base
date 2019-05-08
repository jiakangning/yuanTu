<template>
  <a-drawer class="liveData"
    :title="drawerTitle"
    :width='600'
    @close="$emit('selectData')"
    :visible="visible"
  > 
    <a-input-search
      placeholder="请输入要查询的关键字……"
      @search="onSearch" v-model="keyword" style="width: 300px" 
      pressEnter
      enterButton
    />
    <a-table :columns="columns" :locale="locale" :dataSource="tableData" :pagination="false" :rowKey="record => record.tag" :scroll="{ x: 1200, y: height }">
      <a slot="action" slot-scope="text" href="javascript:;" @click="$emit('selectData', text)">选择</a>
    </a-table>
  </a-drawer>
</template>
<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default() {
        return false
      }
    },
    liveSystem: {
      type: Object,
      default() {
        return {
          system: '',
          name: ''
        }
      }
    },
    dataSource: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      locale: {
        emptyText: '暂无数据'
      },
      columns: [
        { title: '名称', dataIndex: 'name', key: 'name', width: 180, align: 'center', fixed: 'left', },
        { title: '标签', dataIndex: 'tag', key: 'tag', width: 180, align: 'center' },
        { title: '类型', dataIndex: 'type', key: 'type', width: 180, align: 'center' },
        { title: '父级', dataIndex: 'parentTag', key: 'parentTag', width: 150, align: 'center' },
        { title: '位置', dataIndex: 'location', key: 'location', width: 180, align: 'center'},
        { title: '描述', dataIndex: 'deviceDescription', key: 'deviceDescription', align: 'center' },
        {
          title: '操作',
          width: 90,
          key: 'operation',
          fixed: 'right',
          scopedSlots: { customRender: 'action' },
        },
      ],
      height: document.body.clientHeight - 200,
      drawerTitle: this.liveSystem.name,
      tableData: [],
      keyword: ''
    }
  },
  mounted() {
    const self = this
    this.tableData = this.dataSource
    window.onresize = () => {
      return (() => {
        self.height = document.body.clientHeight - 200
      })
    }
  },
  methods: {
    onSearch() {
      if (this.keyword) {
        this.tableData = this.dataSource.filter(item => 
          (item.name && item.name.indexOf(this.keyword) !== -1) || 
          (item.tag && item.tag.indexOf(this.keyword) !== -1) || 
          (item.type && item.type.indexOf(this.keyword) !== -1) || 
          (item.location && item.location.indexOf(this.keyword) !== -1) || 
          (item.deviceDescription && item.deviceDescription.indexOf(this.keyword) !== -1)
        )
      } else {
        this.tableData = this.dataSource
      }
    }
  },
}
</script>

<style lang="less">
  .ant-drawer-header {
    padding: 10px 15px;
    position: sticky;
    top: 0;
    height: 45px;
    z-index: 1;
    background: #fff;
  }
  .ant-drawer-close {
    z-index: 1
  }
</style>