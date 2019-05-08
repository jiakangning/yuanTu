<template>
  <el-select
    v-bind="currentOption"
    v-on="currentListener"
    v-model="currentValue">
    <el-option
      :label="currentOption.switchAlias[0]"
      :value="true"/>
    <el-option
      :label="currentOption.switchAlias[1]"
      :value="false"/>
  </el-select>
</template>

<script>
  import { BasicSearchColumn } from "./basic.js"

  export default {
    extends: BasicSearchColumn,
    computed: {
      currentOption() {
        const { label = "", visible, width = visible ? "200px" : "200px" } = this.column
        return {
          style: { width },
          clearable: true,
          placeholder: label,
          switchAlias: ["是", "否"],
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
        set(value) {
          this.$emit('input', value)
        }
      }
    }
  }
</script>
