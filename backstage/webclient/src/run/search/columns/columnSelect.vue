<template>
  <run-select
    :source="currentSource"
    v-on="currentListener"
    v-bind="currentOption"
    v-model="currentValue">
  </run-select>
</template>

<script>
  import { BasicSearchColumn } from "./basic.js"

  export default {
    extends: BasicSearchColumn,
    computed: {
      currentOption() {
        const { label = "", visible, width = visible ? "200px" : "200px" } = this.column
        let { value, valueKey, ...raw } = this.currentRawOption
        value = (!value && !valueKey) ? "value" : value
        return {
          style: { width },
          label: "label",
          multiple: true,
          filterable: true,
          collapseTags: true,
          clearable: true,
          placeholder: `请选择${ label }`,
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
