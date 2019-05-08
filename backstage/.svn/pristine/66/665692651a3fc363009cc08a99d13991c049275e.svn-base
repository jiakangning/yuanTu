# run-popup-search

## 基础用法

待整理...

<h4>props</h4>

| 属性        | 类型             | 默认值  |  可选值  |  描述  |
| :------------- |:-------------:| :------:| :-------:| :------|
| value       |  Boolean   | 暂无   |         |  控制组件是否加载    | 
| options       |  [PopupSearch](#popupsearch)   | PopupSearch   |         |  PopupSearch 类的一个实例     | 

## PopupSearch

- 基于父类 [Base](/run/Base.html)
- [类属性](#PopupSearchProperties)
- [类方法](#PopupSearchMethods)

<h3 id="PopupSearchProperties">类属性</h3>

| 属性        | 类型           | 
| :------------- |:-------------:|
| sources     | [Source](/run/Source.html)        |  
| config      | [PopupSearchConfig](#popupsearchconfig)        | 
| events      | [Object](#events)        |   
| columns      | [PopupSearchColumn](#popupsearchcolumn)        |   

<h4 id="events">events</h4>

| 事件名        | 说明           | 回调参数  |
| -------------|:-------------------------| :-----|
| search       | 查询按钮的点击事件   | params |
| reset       | 重置按钮的点击事件   | 暂无 |

<h3 id="PopupSearchMethods">类方法</h3>

<table class="methods">
    <tr class="title">
        <td colspan="2"><h3>initColumns</h3></td>    
    </tr>
    <tr>
        <td>描述</td> 
        <td>初始化搜索组件里的筛选项</td> 
   </tr>
    <tr>
        <td>签名</td> 
        <td><code>initColumns([PopupSearchColumn, ...]) => void</code></td> 
   </tr>
    <tr class="title">
        <td colspan="2"><h3>initConfig</h3></td>    
    </tr>
    <tr>
        <td>描述</td> 
        <td>初始化配置项</td> 
   </tr>
    <tr>
        <td>签名</td> 
        <td><code>initConfig(PopupSearchConfig) => void</code></td> 
   </tr>
    <tr class="title">
        <td colspan="2"><h3>getColumns</h3></td>    
    </tr>
    <tr>
        <td>描述</td> 
        <td>获取一组 PopupSearchColumn 实例集合</td> 
   </tr>
    <tr>
        <td>签名</td> 
        <td><code>getColumns() => [PopupSearchColumn, ...]</code></td> 
   </tr>
    <tr class="title">
        <td colspan="2"><h3>getConfig</h3></td>    
    </tr>
    <tr>
        <td>描述</td> 
        <td>获取配置项，传入 <code>field</code> 获取某个属性值</td> 
   </tr>
    <tr>
        <td>签名</td> 
        <td><code>getConfig(field: String ) => Any</code></td> 
   </tr>
</table>

## PopupSearchColumn

- [类属性](#PopupSearchColumnProperties)

<h3 id="PopupSearchColumnProperties">类属性</h3>

| 属性        | 类型           | 默认值  |  可选值  |  描述   |
| ------------- |:-------------:| :-----:| :------| :-------|
| source        | String        | ''    |        |   数据源       |
| layout        | String        | 'time'| 'select'|  筛选项布局        |
| field         | String        | ''    |      |   筛选项字段名       |
| label         | String        | ''    |      |   筛选项显示名称       |

## PopupSearchConfig

- [类属性](#PopupSearchConfigProperties)
- [类方法](#PopupSearchConfigMethods)

<h3 id="PopupSearchConfigProperties">类属性</h3>

| 属性        | 类型           | 默认值  |  可选值  |  描述   |
| ------------- |:-------------:| :-----| :------| :------         |
| switch        | Boolean        | true    |        |   是否显示切换按钮       |
| icon          | Array          | ["el-icon-close", "el-icon-search"] | |  切换按钮不同状态的图标配置        |

<h3 id="PopupSearchConfigMethods">类方法</h3>

<table class="methods">
    <tr class="title">
        <td colspan="2"><h3>get</h3></td>    
    </tr>
    <tr>
        <td>描述</td> 
        <td>获取配置项，传入 <code>field</code> 获取某个属性值，如果不传获取 当前 <code>PopupSearchConfig</code> 实例</td> 
   </tr>
    <tr>
        <td width="50px">签名</td> 
        <td><code>get(field?: String) => Any || PopupSearchConfig</code></td> 
   </tr>
</table>
