# run-chart-widge

## 基础用法 

``` vue
<template>
  <run-chart-widge :options="options"/>
</template>

<script>
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
        this.options = new Run.ChartWidge({
          config: {
            layout: "simple",
            source: "level",
            _total: "total",
            _name: "name",
            _desc: "desc"
          },
          sources: this.sources
        })
      },
      initSources() {
        this.sources.set("level", [
          { total: 5, name: "一级隐患", desc: "占比5%" },
          { total: 20, name: "二级隐患", desc: "占比20%" },
          { total: 40, name: "三级隐患", desc: "占比40%" },
          { total: 40, name: "三级隐患", desc: "占比40%" },
          { total: 35, name: "四级隐患", desc: "占比35%" }
        ])
      }
    }
  }
</script>
```

## props

| 属性        | 类型             | 默认值  |  可选值  |  描述  |
| :------------- |:-------------:| :------:| :-------:| :------|
| options       |  [ChartWidge](#chartwidge)   | ChartWidge   |         |  ChartWidge 类的一个实例     | 

### ChartWidge

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
| theme        | String        | 'tradition'  |        |  颜色值
| layout       | String        | 'simple'     |        |  布局
| btntext      | String        | ''           |        |  有值的时候，会出现一个button,点击弹出框


#### events

| 事件名        | 说明           | 回调参数  |
| -------------|:-------------------------| :-----|
| screen       | 配置 btntext 时的点击事件   | 暂无 |


