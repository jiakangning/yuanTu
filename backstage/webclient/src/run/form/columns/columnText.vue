<template>
  <el-input
    class="columnText"
    v-model.trim="currentValue"
    v-bind="currentOption"
    v-on="currentListener">
    <template
      v-if="currentOption.prepend"
      slot="prepend">
      <span v-html="currentOption.prepend"/>
    </template>
    <template
      v-if="currentOption.append"
      slot="append">
      <span v-html="currentOption.append"/>
    </template>
  </el-input>
</template>

<script>
  import { BasicFormColumn } from "./basic.js"

  export default {
    extends: BasicFormColumn,
    computed: {
      currentOption() {
        return {
          clearable: true,
          ...this.currentRawOption
        }
      },
      currentListener() {
        return this.currentRawListener
      },
      currentValue: {
        get() {
          return this.value
        },
        set(val) {
          if (this.currentOption.type === "number") {
            val = parseFloat(val)
            val = isNaN(val) ? 0 : val
          }
          this.$emit("input", val)
        }
      }
    }
  }
</script>

<style
  lang="stylus"
  type="text/stylus"
  rel="stylesheet/stylus"
  scoped>
  .columnText
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button
      -webkit-appearance: none

    input[type="number"]
      -moz-appearance: textfield
</style>

