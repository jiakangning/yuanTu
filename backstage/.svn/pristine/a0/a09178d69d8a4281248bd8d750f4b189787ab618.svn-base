<template>
  <div class="code">
    <div class="code-content">
      <component :is="'demo-' + tag"></component>
    </div>
    <div class="code--segment" v-if="isShow">
      <highlight-code lang="vue">{{ code }}</highlight-code>
    </div>
    <div class="code--button" @click="handleToggleShow">{{codeTextBtn}}</div>
  </div>
</template>

<script type="text/jsx">
  import componentsConfig from '../demo/config'

  export default {
    name: 'common-code',
    props: {
      tag: {}
    },
    data() {
      return {
        isShow: false,
        code: ''
      }
    },
    computed: {
      codeTextBtn() {
        return this.isShow ? '隐藏代码' : '显示代码'
      }
    },
    created() {
      this.code = componentsConfig[this.tag]
    },
    methods: {
      handleToggleShow() {
        this.isShow = !this.isShow
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../override.styl"

  .code
    .code-content
      display: flex
      justify-content: center
      align-items: center
      box-sizing: border-box

    .code--button
      margin: 30px 0 20px 0
      background: #fafbfc
      color: $accentColor
      font-weight: 400
      line-height: 40px
      text-align: center
      cursor: pointer
      box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6), 0 2px 4px 0 rgba(232, 237, 250, 0.5)
      &:hover
        font-size: 17px

    .code--segment
      margin: 0 15px
    & + .code
      margin-top: 20px
    &:not(:first-child)
      margin-top: 40px
      margin-bottom: 40px

</style>

