<template>
  <run-chart :options="options">
    <run-column
      position="chart"
      after="1"
      title="测试">
    </run-column>
  </run-chart>
</template>

<script>
  import Mock from 'mockjs'
  import Run from 'run'

  export default {
    data() {
      return {
        options: null,
        sources: new Run.Source()
      }
    },
    created() {
      this.initOptions()
      this.initSources()
    },
    methods: {
      initOptions() {
        this.options = new Run.Chart({
          sources: this.sources,
          widge: {
            source: "level", _total: "total", _name: "name", _desc: "desc", _icon: "icon"
          },
          columns: [
            {
              cols: 16,
              title: "隐患等级",
              source: "chart",
              charts: ["bar", "line"],
              _layout: "simple",
              _xAxisName: "隐患类别",
              _yAxisName: "隐患数量"
            },
            {
              cols: 8,
              title: "隐患等级",
              source: "chart",
              charts: ["pie"],
              _layout: "custom",
              _minValue: 0,
              _maxValue: 50,
              _xAxisName: "隐患类别",
              _yAxisName: "隐患数量",
              _serieName: "隐患等级"
            },
            {
              cols: 24,
              title: "隐患等级",
              source: "level2",
              charts: ["line", "bar", "pie"],
              _layout: "simple",
              _xAxisName: "隐患类别",
              _yAxisName: "隐患数量",
              _serieName: "隐患等级"
            },
            {
              cols: 8,
              title: "隐患等级",
              source: "level2",
              charts: ["pie"],
              _layout: "simple",
              _xAxisName: "隐患类别",
              _yAxisName: "隐患数量",
              _serieName: "隐患等级"
            },
            {
              cols: 16,
              title: "隐患等级",
              source: "level2",
              charts: ["bar", "line"],
              _layout: "simple",
              _xAxisName: "隐患类别",
              _yAxisName: "隐患数量",
              _serieName: "隐患等级"
            }
          ],
          search: {
            columns: [
              { field: "category", layout: "select", label: "检查形式", source: "category" },
              { field: "time", layout: "time" }
            ]
          },
          events: {
            search: (options) => {
              console.log(options)
            }
          }
        })
      },
      initSources() {
        const { category, level, level2, chart } = Mock.mock({
          "category|4": [{
            "label|+1": ["基础检查", "安全大检查", "榆北煤业", "上级领导检查"],
            "value|0-50": 1
          }],
          "level|5": [{
            "name|+1": ["一级隐患", "二级隐患", "三级隐患", "四级隐患", "总计"],
            "total": 5,
            "desc": "占比5%"
          }],
          "chart|4": [{
            "name|+1": ["一级隐患", "二级隐患", "三级隐患", "四级隐患"],
            "value|20-50": 1
          }],
          "level2|4": [{
            "name|+1": ["一级隐患", "二级隐患", "三级隐患", "四级隐患"],
            "value|4": [{
              "name|+1": ["基础检查", "安全大检查", "榆北煤业", "上级领导检查"],
              "value|0-50": 1
            }]
          }]
        })
        this.sources.set("category", category)
        this.sources.set("level", level)
        this.sources.set("level2", level2)
        this.sources.set("chart", chart)
      }
    }
  }
</script>
