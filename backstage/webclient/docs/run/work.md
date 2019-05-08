---
pageClass: markdown-page
---

# run-work

## 基础用法

<common-code tag="demo">
</common-code>

待整理...

<h4>props</h4>

| 属性        | 类型             | 默认值  |  描述  |
| :------------- |:-------------:| :------:| :------|
| options       |  [Work](#work)   | Work   | Work 类的一个实例     | 

## Work

- 基于父类 [Base](/run/Base.html)
- [类属性](#WorkProperties)
- [类方法](#WorkMethods)

<h3 id="WorkProperties">类属性</h3>

| 属性        | 类型           | 
| :------------- |:-------------:|
| sources     | [Source](/run/Source.html)        |  
| config      | [WorkConfig](#workconfig)        |  
| events      | [Object](#events)        |   
| form      | [Form](/run/form.html#form)        |   
| search      | [Search](/run/search.html#search)        |   
| list      | [List](/run/list.html#list)        |   
| columns      | Array        |   
| layer        | Object       |   
| actions      | [[WorkAction](), ...]        |   
| tabs      | [Tabs]()        |   

<h4 id="events">events</h4>

| 事件名        | 说明           | 回调参数  |
| -------------|:-------------------------| :-----|
| loading       | 加载数据   | rows, done() |
| search       | 点击查询按钮事件   | params |
| delete       | 点击删除按钮事件   | rows,done() |
| cancel       | 点击表单取消按钮事件   | 空 |
| submit       | 点击表单提交按钮事件   | form, done() |
| create       | 点击创建按钮事件   | form, store |
| update       | 点击修改按钮事件   | form, store |
| edit       | 点击创建和修改按钮都会触发该事件   | form, store |

<h3 id="WorkMethods">类方法</h3>

<table>
    <tr class="title">
        <td colspan="2"><h3>initLoaded</h3></td>    
    </tr>
    <tr>
        <td>描述</td> 
        <td>初始化组件</td> 
   </tr>
    <tr>
        <td>签名</td> 
        <td><code>initLoaded() => void</code></td> 
   </tr>
    <tr class="title">
        <td colspan="2"><h3>initConfig</h3></td>    
    </tr>
    <tr>
        <td>签名</td> 
        <td><code>initConfig(WorkConfig) => void</code></td> 
   </tr>
    <tr class="title">
        <td colspan="2"><h3>initSearch</h3></td>    
    </tr>
    <tr>
        <td>签名</td> 
        <td><code>initSearch(Search) => void</code></td> 
   </tr>
    <tr class="title">
        <td colspan="2"><h3>initList</h3></td>    
    </tr>
    <tr>
        <td>签名</td> 
        <td><code>initList(List) => void</code></td> 
   </tr>
    <tr class="title">
        <td colspan="2"><h3>initForm</h3></td>    
    </tr>
    <tr>
        <td>签名</td> 
        <td><code>initForm(Form) => void</code></td> 
   </tr>
    <tr class="title">
        <td colspan="2"><h3>initTabs</h3></td>    
    </tr>
    <tr>
        <td>签名</td> 
        <td><code>initTabs(Tabs) => void</code></td> 
   </tr>
    <tr class="title">
        <td colspan="2"><h3>initColumns</h3></td>    
    </tr>
    <tr>
        <td>签名</td> 
        <td><code>initColumns(columns?: Array) => void</code></td> 
   </tr>
    <tr class="title">
        <td colspan="2"><h3>initLayer</h3></td>    
    </tr>
    <tr>
        <td>签名</td> 
        <td><code>initLayer(layer?: Object) => void</code></td> 
   </tr>
    <tr class="title">
        <td colspan="2"><h3>initActions</h3></td>    
    </tr>
    <tr>
        <td>签名</td> 
        <td><code>initActions(WorkAction) => void</code></td> 
   </tr>
    <tr class="title">
        <td colspan="2"><h3>getConfig</h3></td>    
    </tr>
    <tr>
        <td>签名</td> 
        <td><code>getConfig(field?: String) => Any || WorkConfig</code></td> 
   </tr>
    <tr class="title">
        <td colspan="2"><h3>getSearch</h3></td>    
    </tr>
    <tr>
        <td>签名</td> 
        <td><code>getSearch() => Search</code></td> 
   </tr>
    <tr class="title">
        <td colspan="2"><h3>getSearch</h3></td>    
    </tr>
    <tr>
        <td>签名</td> 
        <td><code>getList() => List</code></td> 
   </tr>
    <tr class="title">
        <td colspan="2"><h3>getForm</h3></td>    
    </tr>
    <tr>
        <td>签名</td> 
        <td><code>getForm() => Form</code></td> 
   </tr>
    <tr class="title">
        <td colspan="2"><h3>getActions</h3></td>    
    </tr>
    <tr>
        <td>签名</td> 
        <td><code>getActions() => WorkAction</code></td> 
   </tr>
    <tr class="title">
        <td colspan="2"><h3>getTabs</h3></td>    
    </tr>
    <tr>
        <td>签名</td> 
        <td><code>getTabs() => Tabs</code></td> 
   </tr>
    <tr class="title">
        <td colspan="2"><h3>getLayer</h3></td>    
    </tr>
    <tr>
        <td>签名</td> 
        <td><code>getLayer() => layer</code></td> 
   </tr>
</table>

## WorkConfig

- [类属性](#WorkConfigProperties)
- [类方法](#WorkConfigMethods)

<h3 id="WorkConfigProperties">类属性</h3>

<table>
    <tr class="title">
        <td colspan="2"><h3>layout</h3></td>    
    </tr>
    <tr>
        <td>描述</td> 
        <td>指定 work 组件类型</td> 
   </tr>
    <tr>
        <td>类型</td> 
        <td><code>'global' | 'inline'</code></td> 
   </tr>
    <tr class="title">
        <td colspan="2"><h3>title</h3></td>    
    </tr>
    <tr>
        <td>描述</td> 
        <td>work 组件名称</td> 
   </tr>
    <tr>
        <td>类型</td> 
        <td><code>String</code></td> 
   </tr>
    <tr class="title">
        <td colspan="2"><h3>describe</h3></td>    
    </tr>
    <tr>
        <td>描述</td> 
        <td>work 组件描述</td> 
   </tr>
    <tr>
        <td>类型</td> 
        <td><code>String</code></td> 
   </tr>
</table>

<h3 id="WorkConfigMethods">类方法</h3>

<table>
    <tr class="title">
        <td colspan="2"><h3>get</h3></td>    
    </tr>
    <tr>
        <td>描述</td> 
        <td>获取配置项，如果传入 <code>field</code>，获取该关键字下的配置，否则返回 WorkConfig 的一个实例</td> 
   </tr>
    <tr>
        <td width="50px">签名</td> 
        <td><code>get(field?: String) => Any || WorkConfig</code></td> 
   </tr>
</table>
