<template>
  <component
    v-if="options"
    :options="options"
    :is="currentName">
    <slot/>
  </component>
</template>

<script type="text/ecmascript-6">
  import components from './templates'

  export default {
    components,
    name: "run-work",
    props: {
      options: {}
    },
    computed: {
      currentName() {
        return 'template-' + this.options.getConfig('layout')
      }
    }
  }
</script>
