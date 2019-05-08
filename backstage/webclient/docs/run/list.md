---
pageClass: markdown-page
---

# run-list

## 基础用法

待整理...

<h4>props</h4>

| 属性        | 类型             | 默认值  |  可选值  |  描述  |
| :------------- |:-------------:| :------:| :-------:| :------|
| options       |  [List](#list)   | List   |         |  List 类的一个实例     | 

## List

- 基于父类 [Base](/run/Base.html)
- [类属性](#ListProperties)
- [类方法](#ListMethods)

<h3 id="ListProperties">类属性</h3>

| 属性        | 类型           | 
| :------------- |:-------------:|
| sources     | [Source](/run/Source.html)        |  
| config      | [ListConfig](#listconfig)        | 
| columns      | [ListColumn](#listcolumn)        |   
| events      | [Object](#events)        |   

<h4 id="events">events</h4>

| 事件名        | 说明           | 回调参数  |
| -------------|:-------------------------| :-----|
| search       | 查询列表数据事件   | 暂无？？ |

<h3 id="ListMethods">类方法</h3>

<table class="methods">
    <tr class="title">
        <td colspan="2"><h3>initColumns</h3></td>    
    </tr>
    <tr>
        <td>描述</td> 
        <td>初始化表格中的每一列</td> 
   </tr>
    <tr>
        <td>签名</td> 
        <td><code>initColumns([ListColumn, ...]) => void</code></td> 
   </tr>
    <tr class="title">
        <td colspan="2"><h3>initConfig</h3></td>    
    </tr>
    <tr>
        <td>描述</td> 
        <td>初始化表格配置项</td> 
   </tr>
    <tr>
        <td>签名</td> 
        <td><code>initConfig(ListConfig) => void</code></td> 
   </tr>
    <tr class="title">
        <td colspan="2"><h3>getColumns</h3></td>    
    </tr>
    <tr>
        <td>描述</td> 
        <td>获取一组 ListColumn 实例集合</td> 
   </tr>
    <tr>
        <td>签名</td> 
        <td><code>getColumns() => [ListColumn, ...] || []</code></td> 
   </tr>
    <tr class="title">
        <td colspan="2"><h3>getConfig</h3></td>    
    </tr>
    <tr>
        <td>描述</td> 
        <td>获取配置项，传入 <code>field</code> 获取某个属性值，如果不传获取 当前 <code>ListConfig</code> 实例</td> 
   </tr>
    <tr>
        <td>签名</td> 
        <td><code>getConfig(field?: String) => Any || ListConfig</code></td> 
   </tr>
    <tr class="title">
        <td colspan="2"><h3>getDeleteRows</h3></td>    
    </tr>
    <tr>
        <td>描述</td> 
        <td>获取当前选中行，包含勾选和鼠标单击选中</td> 
   </tr>
    <tr>
        <td>签名</td> 
        <td><code>getDeleteRows() => rows</code></td> 
   </tr>
    <tr class="title">
        <td colspan="2"><h3>getParams</h3></td>    
    </tr>
    <tr>
        <td>描述</td> 
        <td>获取当前表格查询参数</td> 
   </tr>
    <tr>
        <td>签名</td> 
        <td><code>getParams() => Object</code></td> 
   </tr>
    <tr class="title">
        <td colspan="2"><h3>getRow</h3></td>    
    </tr>
    <tr>
        <td>描述</td> 
        <td>获取当前表格选中行</td> 
   </tr>
    <tr>
        <td>签名</td> 
        <td><code>getRow() => row</code></td> 
   </tr>
    <tr class="title">
        <td colspan="2"><h3>getSelection</h3></td>    
    </tr>
    <tr>
        <td>描述</td> 
        <td>获取当前表格勾选的行</td> 
   </tr>
    <tr>
        <td>签名</td> 
        <td><code>getSelection() => selection</code></td> 
   </tr>
    <tr class="title">
        <td colspan="2"><h3>setParams</h3></td>    
    </tr>
    <tr>
        <td>描述</td> 
        <td>设置表格加载数据的参数</td> 
   </tr>
    <tr>
        <td>签名</td> 
        <td><code>setParams(params?: {}) => void</code></td> 
   </tr>
    <tr class="title">
        <td colspan="2"><h3>setRow</h3></td>    
    </tr>
    <tr>
        <td>描述</td> 
        <td>设置当前表格选中行</td> 
   </tr>
    <tr>
        <td>签名</td> 
        <td><code>setRow(row) => void</code></td> 
   </tr>
    <tr class="title">
        <td colspan="2"><h3>setSelection</h3></td>    
    </tr>
    <tr>
        <td>描述</td> 
        <td>设置当前表格勾选行</td> 
   </tr>
    <tr>
        <td>签名</td> 
        <td><code>setSelection(selection: Aarry) => void</code></td> 
   </tr>
</table>

## ListColumn

- [类属性](#ListColumnProperties)

<h3 id="ListColumnProperties">类属性</h3>

| 属性        | 类型           | 默认值  |  可选值  |  描述   |
| ------------- |:-------------:| :-----:| :------| :-------|
| source        | String        | ''    |        |   数据源       |
| field         | String        | ''    |        |   表格中每一列对应的属性值       |
| label         | String        | ''    |        |   显示在表格中的字段名       |
| layout        | String        | 'text'| 'date'\| 'datemonth' \| 'datetime' \| 'dateyear' \| 'file' \| 'rate' \| 'select' \| 'switch'       |   表格中每一列的布局       |

## ListConfig

- [类属性](#ListConfigProperties)
- [类方法](#ListConfigMethods)

<h3 id="ListConfigProperties">类属性</h3>

<table class="methods">
    <tr class="title">
        <td colspan="2"><h3>layout</h3></td>    
    </tr>
    <tr>
        <td>描述</td> 
        <td>指定表格类型</td> 
   </tr>
    <tr>
        <td>类型</td> 
        <td><code>'table' | 'treegrid'</code></td> 
   </tr>
    <tr class="title">
        <td colspan="2"><h3>rows</h3></td>    
    </tr>
    <tr>
        <td>描述</td> 
        <td>指定表格中所有行数据对象的字段名称</td> 
   </tr>
    <tr>
        <td>类型</td> 
        <td><code>'rows'</code></td> 
   </tr>
    <tr class="title">
        <td colspan="2"><h3>count</h3></td>    
    </tr>
    <tr>
        <td>描述</td> 
        <td>指定表格中数据总量的字段名称</td> 
   </tr>
    <tr>
        <td>类型</td> 
        <td><code>'count'</code></td> 
   </tr>
    <tr class="title">
        <td colspan="2"><h3>serial</h3></td>    
    </tr>
    <tr>
        <td>描述</td> 
        <td>暂无</td> 
   </tr>
    <tr>
        <td>类型</td> 
        <td><code>Boolean</code></td> 
   </tr>
    <tr>
        <td>默认值</td> 
        <td><code>true</code></td> 
   </tr>
    <tr class="title">
        <td colspan="2"><h3>height</h3></td>    
    </tr>
    <tr>
        <td>描述</td> 
        <td>设置表格高度</td> 
   </tr>
    <tr>
        <td>类型</td> 
        <td><code>'100%'</code></td> 
   </tr>
    <tr class="title">
        <td colspan="2"><h3>selection</h3></td>    
    </tr>
    <tr>
        <td>描述</td> 
        <td>是否显示 checkbox</td> 
   </tr>
    <tr>
        <td>类型</td> 
        <td><code>true</code></td> 
   </tr>
    <tr class="title">
        <td colspan="2"><h3>pagination</h3></td>    
    </tr>
    <tr>
        <td>描述</td> 
        <td>加载数据时，是否分页, 作用于 layout 为<code>'table'</code></td>
   </tr>
    <tr>
        <td>类型</td> 
        <td><code>true</code></td> 
   </tr>
    <tr class="title">
        <td colspan="2"><h3>paginationOptions</h3></td>    
    </tr>
    <tr>
        <td>描述</td> 
        <td>分页配置, 作用于 layout 为<code>'table'</code></td>
   </tr>
    <tr>
        <td>类型</td> 
        <td><code>{}</code></td> 
   </tr>
    <tr class="title">
        <td colspan="2"><h3>primaryField</h3></td>    
    </tr>
    <tr>
        <td>描述</td> 
        <td>节点名称显示的字段名称, 作用于 layout 为<code>'treegrid'</code></td>
   </tr>
    <tr>
        <td>类型</td> 
        <td><code>'name'</code></td> 
   </tr>
    <tr class="title">
        <td colspan="2"><h3>primaryKey</h3></td>    
    </tr>
    <tr>
        <td>描述</td> 
        <td>节点属性值的字段名, 作用于 layout 为<code>'treegrid'</code></td>
   </tr>
    <tr>
        <td>类型</td> 
        <td><code>'id'</code></td> 
   </tr>
    <tr class="title">
        <td colspan="2"><h3>primaryCode</h3></td>    
    </tr>
    <tr>
        <td>描述</td> 
        <td>节点的code, 作用于 layout 为<code>'treegrid'</code></td>
   </tr>
    <tr>
        <td>类型</td> 
        <td><code>'id'</code></td> 
   </tr>
    <tr class="title">
        <td colspan="2"><h3>referenceCode</h3></td>    
    </tr>
    <tr>
        <td>描述</td> 
        <td>父节点标志字段名, 作用于 layout 为<code>'treegrid'</code></td>
   </tr>
    <tr>
        <td>类型</td> 
        <td><code>'parentId'</code></td> 
   </tr>
    <tr class="title">
        <td colspan="2"><h3>nodeOrder</h3></td>    
    </tr>
    <tr>
        <td>描述</td> 
        <td>节点排序, 作用于 layout 为<code>'treegrid'</code></td>
   </tr>
    <tr>
        <td>类型</td> 
        <td><code>'order'</code></td> 
   </tr>
    <tr class="title">
        <td colspan="2"><h3>expandAll</h3></td>    
    </tr>
    <tr>
        <td>描述</td> 
        <td>节点是否全部展开, 作用于 layout 为<code>'treegrid'</code></td>
   </tr>
    <tr>
        <td>类型</td> 
        <td><code>false``</code></td> 
   </tr>
</table>

<h3 id="ListConfigMethods">类方法</h3>

<table class="methods">
    <tr class="title">
        <td colspan="2"><h3>get</h3></td>    
    </tr>
    <tr>
        <td>描述</td> 
        <td>获取配置项，传入 <code>field</code> 获取某个属性值，如果不传获取 当前 <code>ListConfig</code> 实例</td> 
   </tr>
    <tr>
        <td width="50px">签名</td> 
        <td><code>get(field?: String) => Any || ListConfig</code></td> 
   </tr>
</table>
