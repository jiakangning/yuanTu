<template>
  <component
    :options="options"
    :column="column"
    :is="componentName"/>
</template>

<script type="text/ecmascript-6">
  import components from './index.js'

  export default {
    components,
    props: {
      options: {},
      column: {}
    },
    computed: {
      componentName() {
        let { layout = "text" } = this.column
        return typeof layout === "object" ? layout : `column-${ layout }`
      }
    }
  }
</script>
