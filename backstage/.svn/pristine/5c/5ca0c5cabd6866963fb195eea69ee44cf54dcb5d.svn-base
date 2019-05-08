<template>
  <el-row class="networkSettlement">
    <el-col :span="24" v-if="activeName === 'first' || activeName === 'second'">
      <run-search :options="searchOptions" />
    </el-col>
    <el-col :span="24">
       <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="风路解算信息" name="first">
          <wind-path-info :data="windPathData"></wind-path-info>
        </el-tab-pane>
        <el-tab-pane label="节点解算信息" name="second">
          <node-info :data="nodeInfoData"></node-info>
        </el-tab-pane>
        <el-tab-pane label="风机解算信息" name="third">
          <fan-info :data="fanInfoData"></fan-info>
        </el-tab-pane>
        <el-tab-pane label="解算结果信息" name="fourth">
          <result-info :data="resultInfoData"></result-info>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</template>

<script>
import Run from 'run'
import windPathInfo from './components/windPathInfo'
import nodeInfo from './components/nodeInfo'
import fanInfo from './components/fanInfo'
import resultInfo from './components/resultInfo'
export default {
  components: {
    windPathInfo,
    nodeInfo,
    fanInfo,
    resultInfo
  },
  data() {
    return {
      activeName: 'first',
      searchOptions: null,
      sources: new Run.Source(),
      windPathData: [],
      nodeInfoData: [],
      fanInfoData: [],
      resultInfoData: {},
      firstColumns: [
        { label: '风路名称', field: 'a', layout: 'text'},
        { label: '风路通风类型', field: 'b', layout: "select", source: "category"},
        { label: '初始风量', field: 'c', layout: 'date'},
        { label: '风路风阻', field: 'd', layout: 'text'},
        { label: '测量风量', field: 'e', layout: 'text'},
        { label: '解算风量', field: 'f', layout: 'text'},
        { label: '解算风压', field: 'g', layout: 'text'},
        { label: '解算风阻', field: 'h', layout: 'text'},
        { label: '功率', field: 'i', layout: 'text'},
      ],
      secondColumns: [
        { label: '节点名称', field: 'a', layout: 'text'},
        { label: '节点温度', field: 'b', layout: 'text'},
        { label: '节点相对气压', field: 'c', layout: 'text'}
      ]
    }
  },
  created() {
    this.searchOptions = new Run.Search({
      config: {
        layout: "single",
        width: "400px"
      },
      columns: this.firstColumns,
      events: {
        search: (params) => {
          if (this.activeName === 'first') {
            console.log('first')
            console.log(params);
          } else if (this.activeName === 'second') {
            console.log('second')
            console.log(params);
          }
        }
      },
      sources: this.sources
    })
  },
  methods: {
    handleClick(tab, event) {
      switch(this.activeName) {
        case 'first':
          this.searchOptions.columns = this.firstColumns
          break
        case 'second':
          this.searchOptions.columns = this.secondColumns
          break
      }
    }
  }
}
</script>

<style lang="less">
.networkSettlement {
  padding: 20px;
  .el-col-24 {
    margin: 10px 0
  }
}
</style>