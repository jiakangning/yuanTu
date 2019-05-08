<template>
  <el-autocomplete
    v-bind="currentOption"
    v-on="currentListener"
    v-model="currentValue"/>
</template>

<script>
  import { BasicFormColumn } from "./basic.js"
  import _ from 'lodash'

  const pinyinMatch = require('pinyin-match')

  export default {
    extends: BasicFormColumn,
    computed: {
      currentOption() {
        let { value = "value", ...raw } = this.currentRawOption
        return {
          placeholder: "请输入内容",
          fetchSuggestions: this.querySearch,
          valueKey: value,
          ...raw
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
          this.$emit("input", val)
        }
      }
    },
    methods: {
      querySearch(query, cb) {
        let source = this.currentSource.filter(item => {
          if (query) {
            let label = _.get(item, this.currentOption.valueKey)
            return pinyinMatch.match(label + '', query + '')
          } else {
            return true
          }
        })
        cb(source)
      }
    }
  }
</script>
