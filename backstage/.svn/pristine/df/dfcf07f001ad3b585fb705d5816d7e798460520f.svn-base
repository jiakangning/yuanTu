---
pageClass: markdown-page
---

# run-form

## 基础用法

待整理...

<h4>props</h4>

| 属性        | 类型             | 默认值  |  描述  |
| :------------- |:-------------:| :------:| :------|
| options       |  [Form](#form)   | Form   | Form 类的一个实例     | 

## Form

- 基于父类 [Base](/run/Base.html)
- [类属性](#FormProperties)
- [类方法](#FormMethods)

<h3 id="FormProperties">类属性</h3>

| 属性        | 类型           | 
| :------------- |:-------------:|
| sources     | [Source](/run/Source.html)        |  
| config      | [FormConfig](#formconfig)        | 
| columns      | [FormColumn](#formcolumn)        |   
| events      | [Object](#events)        |   

<h4 id="events">events</h4>

| 事件名        | 说明           | 回调参数  |
| -------------|:-------------------------| :-----|
| submit       | 提交表单按钮事件   | form |
| cancel       | 取消按钮事件   | 空 |

<h3 id="FormMethods">类方法</h3>

<table class="methods">
    <tr class="title">
        <td colspan="2"><h3>initConfig</h3></td>    
    </tr>
    <tr>
        <td>描述</td> 
        <td>初始化表单配置项</td> 
   </tr>
    <tr>
        <td>签名</td> 
        <td><code>initConfig(FormConfig) => void</code></td> 
   </tr>
    <tr class="title">
        <td colspan="2"><h3>initColumns</h3></td>    
    </tr>
    <tr>
        <td>描述</td> 
        <td>初始化表单中的每一项</td> 
   </tr>
    <tr>
        <td>签名</td> 
        <td><code>initColumns([FormColumn, ...]) => void</code></td> 
   </tr>
    <tr class="title">
        <td colspan="2"><h3>initForm</h3></td>    
    </tr>
    <tr>
        <td>描述</td> 
        <td>初始化表单对象</td> 
   </tr>
    <tr>
        <td>签名</td> 
        <td><code>initForm(form?: {}) => void</code></td> 
   </tr>
    <tr class="title">
        <td colspan="2"><h3>getConfig</h3></td>    
    </tr>
    <tr>
        <td>描述</td> 
        <td>获取配置项，传入 <code>field</code> 获取某个属性值，如果不传获取 当前 <code>FormConfig</code> 实例</td> 
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
        <td>获取当前表单中每一项的配置</td> 
   </tr>
    <tr>
        <td>签名</td> 
        <td><code>getColumns() => [FormColumn, ...] || []</code></td> 
   </tr>
    <tr class="title">
        <td colspan="2"><h3>getForm</h3></td>    
    </tr>
    <tr>
        <td>描述</td> 
        <td>获取当前表单 form 对象</td> 
   </tr>
    <tr>
        <td>签名</td> 
        <td><code>getForm(field?: String) => Any || form</code></td> 
   </tr>
    <tr class="title">
        <td colspan="2"><h3>setForm</h3></td>    
    </tr>
    <tr>
        <td>描述</td> 
        <td>设置表单对象，如果传入 <code>field</code> , 会覆盖 form 对象的属性值</td> 
   </tr>
    <tr>
        <td>签名</td> 
        <td><code>setForm(val?: any, field?: String) => row</code></td> 
   </tr>
    <tr class="title">
        <td colspan="2"><h3>validateField</h3></td>    
    </tr>
    <tr>
        <td>描述</td> 
        <td>验证表单项</td> 
   </tr>
    <tr>
        <td>签名</td> 
        <td><code>validateField(field) => Boolean</code></td> 
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
        <td colspan="2"><h3>create</h3></td>    
    </tr>
    <tr>
        <td>描述</td> 
        <td>创建form组件</td> 
   </tr>
    <tr>
        <td>签名</td> 
        <td><code>create(row) => void</code></td> 
   </tr>
    <tr class="title">
        <td colspan="2"><h3>update</h3></td>    
    </tr>
    <tr>
        <td>描述</td> 
        <td>更新 form 组件</td> 
   </tr>
    <tr>
        <td>签名</td> 
        <td><code>update(form: {}) => void</code></td> 
   </tr>
</table>

## FormColumn

- [类属性](#FormColumnProperties)

<h3 id="FormColumnProperties">类属性</h3>

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
        <td><code>'date' | 'datemonth' | 'datetime' | 'dateyear' | 'number' |  'rate' | 
            'select' | 
            'switch' | 
            'cascader' | 
            'autocomplete' | 
            'textarea' | 
            'treeselect' | 
            'time' | 
            'radio'  </code></td> 
    </tr>
    <tr>
        <td>描述</td> 
        <td>表格中每一列的布局</td> 
    </tr>
    <tr class="title">
        <td colspan="2"><h3>cols</h3></td>    
    </tr>
    <tr>
        <td>类型</td> 
        <td>24</td> 
    </tr>
    <tr>
        <td>描述</td> 
        <td>表单中每一项占的宽度， <code>1-24</code> 都可以 </td> 
    </tr>
    <tr class="title">
        <td colspan="2"><h3>tips</h3></td>    
    </tr>
    <tr>
        <td>类型</td> 
        <td>String</td> 
    </tr>
    <tr>
        <td>描述</td> 
        <td>如果传入字符串，表单项的 label 后面会加一个小问号提示语，显示字符串</td> 
    </tr>
    <tr class="title">
        <td colspan="2"><h3>rules</h3></td>    
    </tr>
    <tr>
        <td>类型</td> 
        <td><code>Boolean || Number || String</code></td> 
    </tr>
    <tr>
        <td>描述</td> 
        <td>
            表单项的验证规则:<br><br>
            如果为<code>true</code>，认为是必填;<br><br>
            如果为<code>string</code>，认为是必填，并显示该字符串;<br><br>
            如果是整数，则对应相关校验：<br><br>
            0 => 邮箱<br>
            1 => 手机号<br>
            2 => 身份证号<br>
            3 => 网址<br>
            4 => QQ号<br>
            5 => 微信号<br>
            6 => 车牌号<br>
            7 => 正整数<br>
            8 => 负整数<br>
            9 => 整数<br>
            10 => 正数<br>
            11 => 负数<br>
            12 => 数字<br>
            13 => IPV4地址<br>
            14 => 用户名应为4到16位（字母，数字，下划线，减号）<br>
            15 => 密码最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符<br>
            16 => 必须包含中文<br>
        </td> 
    </tr>
</table>

## FormConfig

- [类属性](#FormConfigProperties)
- [类方法](#FormConfigMethods)

<h3 id="FormConfigProperties">类属性</h3>

<table>
    <tr class="title">
        <td colspan="2"><h3>layout</h3></td>    
    </tr>
    <tr>
        <td>描述</td> 
        <td>指定表单类型</td> 
   </tr>
    <tr>
        <td>类型</td> 
        <td><code>'form'</code></td> 
   </tr>
    <tr class="title">
        <td colspan="2"><h3>confirm</h3></td>    
    </tr>
    <tr>
        <td>描述</td> 
        <td>提交表单时，是否显示确认信息</td> 
   </tr>
    <tr>
        <td>类型</td> 
        <td><code>false</code></td> 
   </tr>
    <tr class="title">
        <td colspan="2"><h3>submit</h3></td>    
    </tr>
    <tr>
        <td>描述</td> 
        <td>是否显示提交按钮</td> 
   </tr>
    <tr>
        <td>类型</td> 
        <td><code>true</code></td> 
   </tr>
    <tr class="title">
        <td colspan="2"><h3>hide</h3></td>    
    </tr>
    <tr>
        <td>描述</td> 
        <td>设置需要隐藏的表单项，数组里面是每个<code>column</code>的<code>field</code>值</td> 
   </tr>
    <tr>
        <td>类型</td> 
        <td><code>[]</code></td> 
   </tr>
    <tr class="title">
        <td colspan="2"><h3>disabled</h3></td>    
    </tr>
    <tr>
        <td>描述</td> 
        <td>设置需要禁用的表单项，数组里面是每个<code>column</code>的<code>field</code>值</td> 
   </tr>
    <tr>
        <td>类型</td> 
        <td><code>[]</code></td> 
   </tr>
    <tr class="title">
        <td colspan="2"><h3>default</h3></td>    
    </tr>
    <tr>
        <td>描述</td> 
        <td>配置默认表单默认项</td> 
   </tr>
    <tr>
        <td>类型</td> 
        <td><code>form</code>对象</td> 
   </tr>
</table>

<h3 id="FormConfigMethods">类方法</h3>

<table>
    <tr class="title">
        <td colspan="2"><h3>initRules</h3></td>    
    </tr>
    <tr>
        <td>描述</td> 
        <td>初始化验证规则</td> 
   </tr>
    <tr>
        <td width="50px">签名</td> 
        <td><code>initRules(rules: [], columns: []) => void</code></td> 
   </tr>
    <tr class="title">
        <td colspan="2"><h3>get</h3></td>    
    </tr>
    <tr>
        <td>描述</td> 
        <td>获取配置项,如果传入 <code>field</code>，获取该关键字下的配置，否则返回 FormConfig 的一个实例</td> 
   </tr>
    <tr>
        <td width="50px">签名</td> 
        <td><code>get(field?: String) => Any || FormConfig</code></td> 
   </tr>
    <tr class="title">
        <td colspan="2"><h3>set</h3></td>    
    </tr>
    <tr>
        <td>描述</td> 
        <td>设置配置项</td> 
   </tr>
    <tr>
        <td width="50px">签名</td> 
        <td><code>set(obj: Object) => void</code></td> 
   </tr>
</table>
