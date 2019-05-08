---
pageClass: markdown-page
---

# run-search

## 基础用法

待整理...

<h4>props</h4>

| 属性        | 类型             | 默认值  |  描述  |
| :------------- |:-------------:| :------:| :------|
| options       |  [Search](#search)   | Search   | Search 类的一个实例     | 

## Search

- 基于父类 [Base](/run/Base.html)
- [类属性](#SearchProperties)
- [类方法](#SearchMethods)

<h3 id="SearchProperties">类属性</h3>

| 属性        | 类型           | 
| :------------- |:-------------:|
| sources     | [Source](/run/Source.html)        |  
| config      | [SearchConfig](#searchconfig)        | 
| columns      | [SearchColumn](#searchcolumn)        |   
| events      | [Object](#events)        |   
| params      | Object        |   

<h4 id="events">events</h4>

| 事件名        | 说明           | 回调参数  |
| -------------|:-------------------------| :-----|
| search       | 点击查询按钮触发事件   | 空 |
| input       | 表单项 value 值改变触发改事件   | 空 |

<h3 id="SearchMethods">类方法</h3>

<table class="methods">
    <tr class="title">
        <td colspan="2"><h3>initConfig</h3></td>    
    </tr>
    <tr>
        <td>描述</td> 
        <td>初始化搜索组件配置项</td> 
   </tr>
    <tr>
        <td>签名</td> 
        <td><code>initConfig(SearchConfig) => void</code></td> 
   </tr>
    <tr class="title">
        <td colspan="2"><h3>initColumns</h3></td>    
    </tr>
    <tr>
        <td>描述</td> 
        <td>初始化搜索组件中的每一项</td> 
   </tr>
    <tr>
        <td>签名</td> 
        <td><code>initColumns([SearchColumn, ...]) => void</code></td> 
   </tr>
    <tr class="title">
        <td colspan="2"><h3>initParams</h3></td>    
    </tr>
    <tr>
        <td>描述</td> 
        <td><code> ？？？ </code></td> 
   </tr>
    <tr>
        <td>签名</td> 
        <td><code>initParams(params: {}) => void</code></td> 
   </tr>
    <tr class="title">
        <td colspan="2"><h3>getConfig</h3></td>    
    </tr>
    <tr>
        <td>描述</td> 
        <td>获取配置项，传入 <code>field</code> 获取某个属性值，如果不传获取 当前 <code>SearchConfig</code> 实例</td> 
   </tr>
    <tr>
        <td>签名</td> 
        <td><code>getConfig(field?: String) => Any || ListConfig</code></td> 
   </tr>
    <tr class="title">
        <td colspan="2"><h3>getColumns</h3></td>    
    </tr>
    <tr>
        <td>描述</td> 
        <td>获取当前搜索组件中的每一项的配置</td> 
   </tr>
    <tr>
        <td>签名</td> 
        <td><code>getColumns() => [SearchColumn, ...] || []</code></td> 
   </tr>
    <tr class="title">
        <td colspan="2"><h3>getParams</h3></td>    
    </tr>
    <tr>
        <td>描述</td> 
        <td>获取搜索组件 params 对象</td> 
   </tr>
    <tr>
        <td>签名</td> 
        <td><code>getParams(field?: String) => Any || params</code></td> 
   </tr>
    <tr class="title">
        <td colspan="2"><h3>setParams</h3></td>    
    </tr>
    <tr>
        <td>描述</td> 
        <td>设置搜索对象，如果传入 <code>field</code> , 会覆盖 form 对象的属性值</td> 
   </tr>
    <tr>
        <td>签名</td> 
        <td><code>setParams(val?: any, field?: String) => void</code></td> 
   </tr>
</table>

## SearchColumn

- [类属性](#SearchColumnProperties)

<h3 id="SearchColumnProperties">类属性</h3>

<table>
    <tr class="title">
        <td colspan="2"><h3>source</h3></td>    
    </tr>
    <tr>
        <td width="50">类型</td> 
        <td>String</td> 
    </tr>
    <tr>
        <td>描述</td> 
        <td>数据源</td> 
    </tr>
    <tr class="title">
        <td colspan="2"><h3>field</h3></td>    
    </tr>
    <tr>
        <td>类型</td> 
        <td>String</td> 
    </tr>
    <tr>
        <td>描述</td> 
        <td>表单中中每一项对应的属性值</td> 
    </tr>
    <tr class="title">
        <td colspan="2"><h3>label</h3></td>    
    </tr>
    <tr>
        <td>类型</td> 
        <td>String</td> 
    </tr>
    <tr>
        <td>描述</td> 
        <td>显示在表单中的字段名</td> 
    </tr>
    <tr class="title">
        <td colspan="2"><h3>layout</h3></td>    
    </tr>
    <tr>
        <td>类型</td> 
        <td><code>'text' | 'date' | 'datetime' | 'month' | 'select' |  'switch' | 
            'time' | 
            'year' | </code></td> 
    </tr>
    <tr>
        <td>描述</td> 
        <td>表格中每一列的布局</td> 
    </tr>
    <tr class="title">
        <td colspan="2"><h3>width</h3></td>    
    </tr>
    <tr>
        <td>类型</td> 
        <td>'200px'</td> 
    </tr>
    <tr>
        <td>描述</td> 
        <td>搜索组件中每一项占的宽度值</td> 
    </tr>
    <tr class="title">
        <td colspan="2"><h3>visible</h3></td>    
    </tr>
    <tr>
        <td>类型</td> 
        <td>Boolean</td> 
    </tr>
    <tr>
        <td>描述</td> 
        <td>？？？暂未开放</td> 
    </tr>
</table>

## SearchConfig

- [类属性](#SearchConfigProperties)

<h3 id="SearchConfigProperties">类属性</h3>

<table>
    <tr class="title">
        <td colspan="2"><h3>layout</h3></td>    
    </tr>
    <tr>
        <td>描述</td> 
        <td>指定搜索组件类型</td> 
   </tr>
    <tr>
        <td>类型</td> 
        <td><code>'popup'</code></td> 
   </tr>
    <tr>
        <td>可选值</td> 
        <td><code>'single' | 'multiple' | 'popup'</code></td> 
   </tr>
    <tr class="title">
        <td colspan="2"><h3>width</h3></td>    
    </tr>
    <tr>
        <td>描述</td> 
        <td>组件宽度，作用于 layout 为 <code>'single'</code></td> 
   </tr>
    <tr>
        <td>类型</td> 
        <td><code>'500px'</code></td> 
   </tr>
    <tr class="title">
        <td colspan="2"><h3>primary</h3></td>    
    </tr>
    <tr>
        <td>描述</td> 
        <td>设定主要的搜索项，会显示在最前面，传入 <code>field</code> 值</td> 
   </tr>
    <tr>
        <td>类型</td> 
        <td><code>String</code></td> 
   </tr>
</table>
