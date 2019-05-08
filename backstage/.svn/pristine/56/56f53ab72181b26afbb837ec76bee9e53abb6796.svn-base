# run-chart-Card

## 基础用法

```vue
<template>
  <run-chart-card :options="options"/>
</template>

<script>
  import Run from 'run'
  import Mock from 'mockjs'

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
        this.options = new Run.ChartCard({
           config: {
             cols: 24,
             title: "行业统计",
             source: "simple",
             charts: ["bar", "line"],
             layout: "simple",
             _xAxisName: '类型',
             _yAxisName: '演练次数',
             _serieName: "行业统计"
           },
           sources: this.sources
         })
      },
      initSources() {
        const { items } = Mock.mock({
           "items|24": [
             {
               "name|+1": [
                 '危险化学品',
                 '非媒矿山',
                 '金属演练',
                 '工贸企业',
                 '烟花爆竹',
                 '其他'
               ],
               "value|1-50": 1
             }
           ]
        }) 
    
        this.sources.set('simple', items)
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
| config      | [Object](#config)        | 
| events      | [Object](#events)        |   

#### config

| 属性名        | 类型          | 默认值         | 可选值  | 描述  |
| :-------------|:-------------:|:------------:|:------:|:--------|
| source       | String        | ''           |        |  数据源
| cols         | Number        | 24  |   1-24     |  宽度（24列布局）
| height       | Number        | 300     |        |  高度
| title        | String        | ''           |        |  图表统计标题
| download     | Object        | {}           |        |  右上角工具栏配置
| charts       | Array         | []           |  ['bar', 'line', 'pie']      |  所展示的统计图类型
| _layout      | String        | 'simple'           |  ''      |  charts里需要展示各个图表类型的布局方式
| _xAxisName   | String        | ''           |  ''      |  X轴名称
| _yAxisName   | String        | ''           |  ''      |  Y轴名称
| _serieName   | String        | ''           |  ''      |  系列名称
| _color       | Array         | []           |  []      |  图表颜色
| bar          | [Object](#bar)        | {}           |       |  条形图相关配置项
| line         | [Object](#line)        | {}           |       |  折线图相关配置项
| pie          | [Object](#pie)        | {}           |       |  饼图相关配置项

- download 默认配置

```js
download = {
     icon: "el-icon-download",
     desc: "导出为图片",
     options: { pixelRatio: 3 }
}
```

::: tip 提示
如需对单个图表进行定制化配置，可直接写在 config 对象下，以下划线开头的方式。也可单独写在各自的图表对象配置下，如 bar 对象、line 对象、pie 对象。
需要注意的是，图表配置对象，会覆盖掉 config 下以下划线开头的属性值。如果需要展示的图表都有同一个属性，可采用下划线方式配置，减少冗余。
:::


<a name="bar" style="cursor:pointer">条形统计图相关配置（bar）</a>

| 属性名        | 类型          | 默认值         | 可选值  | 描述  |
| :-------------|:-------------:|:------------:|:------|:--------|
| layout       | String        | 'simple'           |  'simple' \| 'reverse' \| 'negative' \| 'stack'      |  布局
| hasDataZoom  | Boolean       | false           |        |  是否显示区域缩放组件,作用于 <span style="color: red">simple</span> 布局
| grid         | Object        | {}           |        |  直角坐标系，[参考配置](https://echarts.baidu.com/option.html#grid),作用于 'reverse'、'negative'、'stack'

- 此处展示简单布局的条形统计图示例代码，待开发...

- 此处展示反转布局的条形统计图示例代码，待开发...

- 此处展示正负值布局的条形统计图示例代码，待开发...

- 此处展示堆叠布局的条形统计图示例代码，待开发...

<a name="line" style="cursor:pointer">折线统计图相关配置（line）</a>

| 属性名        | 类型          | 默认值         | 可选值  | 描述  |
| :-------------|:-------------:|:------------:|:------|:--------|
| layout       | String        | 'simple'           |  'simple' \| 'area' \| 'dynamic'     |  布局
| hasDataZoom  | Boolean       | true           |        |  是否显示区域缩放组件,作用于 <span style="color: red">area</span> 布局
| grid         | Object        | {}           |        |  直角坐标系，[参考配置](https://echarts.baidu.com/option.html#grid),作用于 'dynamic'
| hasLimit     | Boolean       | false          |        |  是否显示上限或上限值，作用于 'dynamic'
| minLimit     | Number        | 50          |        |  下限值，作用于 'dynamic'
| maxLimit     | Number        | 600         |        |  上限值，作用于 'dynamic'

- 此处展示简单布局的折线统计图示例代码，待开发...

- 此处展示区域布局的折线统计图示例代码，待开发...

- 此处展示时间轴 + 动态数据布局的折线统计图示例代码，待开发...

<a name="pie" style="cursor:pointer">饼状统计图相关配置（pie）</a>

| 属性名        | 类型          | 默认值         | 可选值  | 描述  |
| :-------------|:-------------:|:------------:|:------|:--------|
| layout       | String        | 'simple'           |  'simple' \| 'doughnut' \| 'custom'     |  布局
| hasLegend    | Boolean       | false          |        |  是否显示图例，作用于 'simple'
| minValue     | Number        | 0          |        |  最小值，作用于 'custom'[视觉映射组件](https://echarts.baidu.com/option.html#visualMap)
| maxValue     | Number        | 500         |        |  最大值，作用于 'custom'
| color        | String        | '#F56C6C'         |        |  颜色值，作用于 'custom'

- 此处展示饼状统计图示例代码，待开发...

- 此处展示环形统计图示例代码，待开发...

- 此处展示南丁格尔图示例代码，待开发...











