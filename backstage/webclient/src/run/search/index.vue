<template>
  <component
    v-if="currentColumns.length"
    @search="onSearch"
    @input="onInput"
    :options="options"
    :is="currentName"/>
</template>

<script type="text/ecmascript-6">
  import Search from "../model/Search.js"
  import components from './templates'

  export default {
    components,
    name: "run-search",
    props: {
      options: {
        default() {
          return new Search({})
        }
      }
    },
    computed: {
      currentName() {
        return 'template-' + this.options.getConfig('layout')
      },
      currentColumns() {
        return this.options.getColumns()
      }
    },
    methods: {
      onSearch() {
        this.$emit(Search.EVENTS.search, this.options.getParams())
        this.options.emit(Search.EVENTS.search, this.options.getParams())
      },
      onInput() {
        this.$emit(Search.EVENTS.input, this.options.getParams())
        this.options.emit(Search.EVENTS.input, this.options.getParams())
      }
    }
  }
</script>
