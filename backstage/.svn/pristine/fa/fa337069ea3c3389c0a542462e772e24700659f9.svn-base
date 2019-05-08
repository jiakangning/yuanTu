<template>
  <run-select
    :source="currentSource"
    v-on="currentListener"
    v-bind="currentOption"
    v-model="currentValue">
  </run-select>
</template>

<script>
  import { BasicFormColumn } from "./basic.js"

  export default {
    extends: BasicFormColumn,
    computed: {
      currentOption() {
        let { value, valueKey, ...raw } = this.currentRawOption
        value = (!value && !valueKey) ? "value" : value
        return {
          label: "label",
          multiple: false,
          filterable: true,
          collapseTags: true,
          placeholder: "请选择",
          valueCode: value,
          valueKey: valueKey,
          ...raw
        }
      },
      currentListener() {
        return this.currentRawListener
      },
      currentValue: {
        get() {
          if (!this.currentOption.multiple) return this.value
          return this.value || []
        },
        set(val) {
          this.$emit('input', val)
        }
      }
    }
  }
</script>
