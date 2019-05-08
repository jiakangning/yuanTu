# run-chart

## 基础用法 

```vue
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

  const ICON = require('./icon.png')

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
            "icon": ICON,
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
```

## props

| 属性        | 类型             | 默认值  |  可选值  |  描述  |
| :------------- |:-------------:| :------:| :-------:| :------|
| options       |  [ChartCard](#chartcard)   | ChartCard   |         |  ChartCard 类的一个实例     | 

### ChartCard

- 基于父类 [Base](/run/Base.html)

#### 类属性列表

| 属性        | 类型           | 
| :------------- |:-------------:|
| sources     | [Source](/run/Source.html)        |  
| events      | [Object](#events)        |   
| widge      | [ChartWidge](/run/chartWidge.html#chartwidge)        |   
| columns      | [[ChartCard](/run/chartCard.html#chartcard)...]        |   
| search      | [Search](/run/search.html)        |   

#### events

| 事件名        | 说明           | 回调参数  |
| -------------|:-------------------------| :-----|
| screen       | run-chart-widge 组件中 配置 btntext 时的点击事件   | 暂无 |
| search       | run-popup-search 组件中 查询按钮的点击事件   | params |
| reset       | run-popup-search 组件中 重置按钮的点击事件   | 暂无 |

#### 类方法

<table class="methods">
    <tr class="title">
        <td colspan="2">initSearch</td>    
    </tr>
    <tr>
        <td>描述</td> 
        <td>初始化搜索组件</td> 
   </tr>
    <tr>
        <td>签名</td> 
        <td><code>initSearch(Search) => void</code></td> 
   </tr>
    <tr class="title">
        <td colspan="2">initWidge</td>    
    </tr>
    <tr>
        <td>描述</td> 
        <td>初始化卡片统计组件</td> 
   </tr>
    <tr>
        <td>签名</td> 
        <td>initWidge(ChartWidge) => void</td> 
   </tr>
    <tr class="title">
        <td colspan="2">initColumns</td>    
    </tr>
    <tr>
        <td>描述</td> 
        <td>初始化图表统计组件</td> 
   </tr>
    <tr>
        <td>签名</td> 
        <td>initColumns([ChartCard, ...]) => void</td> 
   </tr>
    <tr class="title">
        <td colspan="2">getSearch</td>    
    </tr>
    <tr>
        <td>描述</td> 
        <td>获取搜索组件实例</td> 
   </tr>
    <tr>
        <td>签名</td> 
        <td>getSearch() => Search</td> 
   </tr>
    <tr class="title">
        <td colspan="2">getWidge</td>    
    </tr>
    <tr>
        <td>描述</td> 
        <td>获取卡片统计组件实例</td> 
   </tr>
    <tr>
        <td>签名</td> 
        <td>getWidge() => ChartWidge</td> 
   </tr>
    <tr class="title">
        <td colspan="2">getColumns</td>    
    </tr>
    <tr>
        <td>描述</td> 
        <td>获取一组图表统计组件实例</td> 
   </tr>
    <tr>
        <td>签名</td> 
        <td>getColumns() => [ ChartCard, ... ]</td> 
   </tr>
    <tr class="title">
        <td colspan="2">transform</td>    
    </tr>
    <tr>
        <td>描述</td> 
        <td>暂无</td> 
   </tr>
    <tr>
        <td>签名</td> 
        <td>transform(Search) => { columns, config }</td> 
   </tr>
</table>
