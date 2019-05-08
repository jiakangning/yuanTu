<template>
  <el-row class="run-form">
    <el-form
      class="run-form-wrap"
      v-bind="currentOption"
      ref="form">
      <component
        :options="options"
        :is="currentName">
        <slot/>
      </component>
    </el-form>
    <el-row
      class="run-form-btn is-right">
      <el-button
        @click="onCancel">关闭
      </el-button>
      <el-button
        v-if="currentSubmit"
        @click="onSubmit"
        :loading="loading"
        type="primary">提交
      </el-button>
    </el-row>
  </el-row>
</template>

<script>
  import Form from '../model/Form'
  import template from './templates'

  export default {
    name: "run-form",
    components: template,
    props: {
      options: {}
    },
    computed: {
      currentName() {
        return `template-${ this.options.getConfig('layout') }`
      },
      currentForm() {
        return this.options.getForm()
      },
      currentRules() {
        return this.options.getConfig('rules')
      },
      currentConfirm() {
        return this.options.getConfig('confirm')
      },
      currentRawOption() {
        return this.options.getConfig('rawOption')
      },
      currentOption() {
        return {
          labelWidth: "100px",
          validateOnRuleChange: false,
          ...this.currentRawOption,
          rules: this.currentRules,
          model: this.currentForm
        }
      },
      currentSubmit() {
        return this.options.getConfig('submit')
      }
    },
    data() {
      return {
        loading: false
      }
    },
    methods: {
      onCancel() {
        this.$emit(Form.EVENTS.cancel)
        this.options.emit(Form.EVENTS.cancel)
      },
      onSubmit() {
        this.validate().then(this.confirm).then(this.submit)
      },
      confirm() {
        if (!this.currentConfirm) {
          return Promise.resolve()
        } else {
          return this.$confirm(`您确定要提交嘛？`, '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' })
        }
      },
      submit() {
        this.loading = true
        this.$emit(Form.EVENTS.submit, this.options.getForm(), this.done)
        this.options.emit(Form.EVENTS.submit, this.options.getForm(), this.done)
      },
      done(err, data) {
        this.loading = false
        if (err) return
        this.$emit(Form.EVENTS.success, data)
        this.options.emit(Form.EVENTS.success, data)
        this.$message.success("提交成功！")
      },
      validate() {
        return this.$refs.form.validate()
      },
      validateField(field) {
        return this.$refs.form.validateField(field)
      }
    },
    created() {
      this.options.initContext(this)
    }
  }
</script>

<style
  lang="stylus"
  type="text/stylus"
  rel="stylesheet/stylus">
  .run-form
    position: relative
    display: flex
    flex-direction: column
    width: 100%
    height: 100%
    overflow: hidden
    padding: 15px 10px 15px 15px
    box-sizing: border-box

    &-wrap
      margin-bottom: 40px
      padding-right: 15px
      overflow: auto

    &-btn
      position: absolute
      bottom: 0
      right: 0
      left: 0
      background-color: #fff
      padding: 10px
      border-top: 1px solid #eee
      text-align: right
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)

      &.el-row
        position: absolute

      &.is-center
        text-align: center

      &.is-left
        text-align: left
</style>
